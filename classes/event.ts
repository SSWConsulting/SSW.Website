import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export class Event {
    Id: string;
    Url: {
      Description: string;
      Url: string;
    };
    Thumbnail: {
      Description: string;
      Url: string;
    };
    StartDateTime: Date;
    EndDateTime: Date;
    Title: string;
    Presenter: string;
    FormattedDate: string;
    RelativeDate: string;
  
    constructor(e) {
      this.Id = e.Id;
      this.Url = {
        Description: e.Url.Description,
        Url: e.Url.Url,
      };
      this.Thumbnail = {
        Description: e.Thumbnail.Description,
        Url: e.Thumbnail.Url,
      };
      this.StartDateTime = new Date(e.StartDateTime);
      this.EndDateTime = new Date(e.EndDateTime);
      this.Title = e.Title;
      this.Presenter = e.Presenter;
      this.FormattedDate = this.formatDate();
      this.RelativeDate = this.formatRelativeDate();
    }
  
    private formatDate() {
      if (!this.StartDateTime || !this.EndDateTime) return null;
  
      // NOTE: Omit ddd for brevity if it's next year's event
      const dateformat =
        dayjs(this.StartDateTime).year === dayjs().year
          ? "ddd MMM D"
          : "MMM D YYYY";
      const isOneDayEvent = dayjs(this.StartDateTime)
        .startOf("day")
        .isSame(dayjs(this.EndDateTime).startOf("day"));
      const startDate = dayjs(this.StartDateTime).format(dateformat);
      const endDate = dayjs(this.EndDateTime).format(dateformat);
  
      return isOneDayEvent ? startDate : `${startDate} - ${endDate}`;
    }
  
    private formatRelativeDate() {
      const now = dayjs();
      const start = dayjs(this.StartDateTime);
      const end = dayjs(this.EndDateTime);
  
      if (now.isBetween(start, end)) {
        return "now running";
      }
  
      const days = start.diff(now, "d");
      if (days === 0) {
        return "today";
      } else {
        return `${days} ${days === 1 ? "day" : "days"} to go`;
      }
    }
  }