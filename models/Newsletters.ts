export interface Newsletters {
	newsletters: NewsletterContent[];
	newsletters_year: string;
}

export interface NewsletterContent {
	description: string;
	month: number;
	url: string;
}
