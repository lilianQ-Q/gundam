import { ReportSite } from "./ReportSite.type";
import { Tag } from "./Tag.type";

export type Report = {
	id: number;
	title: string;

	userId: number;
	typeId: number;
	
	sites: ReportSite[];
	tags: Tag[];

	createdAt: string;
	modifiedAt: string;
}