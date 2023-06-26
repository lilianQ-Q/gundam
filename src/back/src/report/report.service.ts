import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Report } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService
{
    public constructor(private prisma: PrismaService) {}

    async getLastReports(userId: number) : Promise<Report[] | null>
    {
        return await this.prisma.report.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                sites: {
                    include: {
                        status: true
                    }
                }
            }
        });
    }

    async createReport(userId: number) : Promise<Report | null>
    {
        return await this.prisma.report.create({
            data: {
                title: 'Automatic Scheduled Report',
                userId: userId,
            }
        })
    }

    async getReport(reportId: number) : Promise<Report | null> {
        return await this.prisma.report.findUnique({
            where: {
                id: reportId
            },
            include: {
                sites: {
                    include: {
                        status: true,
                        site: {
                            include: {
                                groups: true
                            }
                        },
                    }
                },
                type: true,
            }
        });
    }

    async getUserReportCount(id: number) : Promise<number>
    {
        return await this.prisma.report.count({
            where: {
                userId: id
            }
        });
    }

    async getCountOfFailedSitesCurrentMonth(id: number) : Promise<number>
    {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return await this.prisma.reportSite.count({
            where: {
                createdAt: {
                    gte: startOfMonth.toISOString()
                },
                status: {
                    name: 'failed'
                },
                report: {
                    userId: id
                }
            }
        });
    }

    async getCountOfFailedSitesPreviousMonth(id: number) : Promise<number>
    {
        const now = new Date();
        const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return await this.prisma.reportSite.count({
            where: {
                createdAt: {
                    gte: previousMonth.toISOString(),
                    lt: startOfCurrentMonth.toISOString()
                },
                status: {
                    name: 'failed'
                },
                report: {
                    userId: id
                }
            }
        });
    }

    async getFailedSitePercentage(userId: number) : Promise<number>
    {
        const currentMonthCount = await this.getCountOfFailedSitesCurrentMonth(userId);
        const lastMonthCount = await this.getCountOfFailedSitesPreviousMonth(userId);

        if (lastMonthCount === 0)
            return currentMonthCount > 0 ? 100 : 0;

        const percentage = ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;

        return Math.round(percentage);
    }

    async getNewReportPercentage(userId: number) : Promise<number> 
    {
        
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const currentMonthReportCount = await this.prisma.report.count({
            where: {
                createdAt: {
                    gte: currentMonthStart.toISOString()
                },
                userId: userId
            }
        });

        const previousMonthReportCount = await this.prisma.report.count({
            where: {
                createdAt: {
                    gte: previousMonthStart,
                    lt: currentMonthStart
                },
                userId: userId
            }
        });

        if (previousMonthReportCount === 0)
            return currentMonthReportCount > 0 ? 100 : 0;

        const percentage = ((currentMonthReportCount - previousMonthReportCount) / previousMonthReportCount) * 100;

        return Math.round(percentage);
    }

    async autoUserReport()
    {
        // Foreach user, get all sites, create report and put sites in it, do it daily
    }
}
