import { BadRequestException, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, Report } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { GetCurrentUserId } from '../auth/common/decorators';
import { ReportSiteService } from '../report-site/report-site.service';
import { SiteService } from '../site/site.service';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController
{
	public constructor (
		private reportService: ReportService,
		private reportSiteService: ReportSiteService,
		private siteService: SiteService,
	) {}

	@Get('/getlastreports')
	async getLastReports(@GetCurrentUserId() id: number) : Promise<Report[] | null>
	{
		return await this.reportService.getLastReports(id);
	}

	@Post('/create')
	async createNewReport(@GetCurrentUserId() id: number) : Promise<Report | null>
	{
		// Create a new report
		// Add all sites associated to a user
		const reportWithoutSites = await this.reportService.createReport(id);

		if (!reportWithoutSites)
			return null;

		const sites = await this.siteService.getAllUserSites(id);
		
		await this.reportSiteService.createReportSite(reportWithoutSites.id, sites.map(site => site.id));
		
		return this.reportService.getReport(reportWithoutSites.id);
	}

	@Get('/count')
	async getUserReportCount(@GetCurrentUserId() id: number) : Promise<number | null>
	{
		return await this.reportService.getUserReportCount(id);
	}

	@Get('/countreportpercentage')
	async getNewReportPercentage(@GetCurrentUserId() id: number) : Promise<number>
	{
		return await this.reportService.getNewReportPercentage(id);
	}

	@Get('/countfailed')
	async getCountOfUserFailedReportSites(@GetCurrentUserId() id: number) : Promise<number>
	{
		return await this.reportService.getCountOfFailedSitesCurrentMonth(id);
	}

	@Get('/countfailedpercentage')
	async getCountOfUserFailedReportSitesPercentage(@GetCurrentUserId() id: number) : Promise<number>
	{
		return await this.reportService.getFailedSitePercentage(id);
	}

	@Get('/get/:reportId')
	async getReportWithId(@Param('reportId') reportId: string, @GetCurrentUserId() userId: number) : Promise<Report | null>
	{
		const parsedId = parseInt(reportId, 10);
		if (isNaN(parsedId))
			throw new BadRequestException('Invalid report id');
		const report = await this.reportService.getReport(parsedId);
		// Si mon identifiant utilisateur ne match pas avec le créateur de ce rapport
		// alors je renvois une erreur sauf s'il a accepté de le partager blahblahblah
		if (report.userId !== userId)
			throw new BadRequestException("You didn't create this report, cannot see it");

		return report;
	}

	createSpecificReport()
	{
		// Takes groups or sites ids to add it in new report
	}
}
