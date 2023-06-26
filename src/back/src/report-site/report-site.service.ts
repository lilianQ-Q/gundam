import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReportSite } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportSiteService
{
    public constructor(private prisma: PrismaService) {}

    async createReportSite(reportId: number, siteIds: number[])
    {
        const reportSitesData = siteIds.map((siteId) => ({
            reportId,
            siteId,
            statusId: 1,
        }));

        return await this.prisma.reportSite.createMany({
            data: reportSitesData,
            skipDuplicates: true
        });
    }

    @Cron('*/10 * * * * *')
    async CheckAvailability()
    {
        const sites = await this.prisma.reportSite.findMany({
            where: {
                statusId: 1
            },
            include: {
                site: true,
                status: true,
            }
        });

        // For each sites check if the url is up or not, if yes change the status to 2, if not change the status to 3 and update the row in db

        sites.forEach(async (site) => {
            const isUrlUp = await this.checkUrlAvailability(site.site.url);
            
            // Si l'url n'est pas up, ajouter le rapport qui contient le site actuel dans un array
            // Puis récupérer l'email de l'user qui a créer le rapport et lui envoyer un mail

            await this.prisma.reportSite.update({
                where: {
                    id: site.id
                },
                data: {
                    statusId: isUrlUp ? 2 : 3
                }
            });
        })
    }

    async checkUrlAvailability(url: string) : Promise<boolean>
    {
        try {
            const response = await axios.get(url);
            return response.status === 200;
        }
        catch {
            return false;
        }
    }
}
