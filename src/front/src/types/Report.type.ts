import { Site } from "./Site.type";
import { Tag } from "./Tag.type";

export type Report = {
	id: number;
	title: string;
	userId: number;
	typeId: number;
	statusId: number;
	
	sites: Site[];
	tags: Tag[];

	createdAt: string;
	modifiedAt: string;
}