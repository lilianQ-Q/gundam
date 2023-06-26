import { Site } from "./Site.type";
import { Status } from "./Status.type";

export type ReportSite = {
	id: number;
	
    reportId: number;
    siteId: number;
    statusId: number;

    site?: Site;
    status?: Status;

	createdAt: string;
	modifiedAt: string;
}