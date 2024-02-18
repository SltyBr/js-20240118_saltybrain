import fetchJson from "./utils/fetch-json.js";
import ColumnChartV1 from "../../04-oop-basic-intro-to-dom/1-column-chart/index.js";
const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart extends ColumnChartV1 {
  constructor({
    url = '',
    label = '',
    value = 0,
    range: {
      from = new Date(),
      to = new Date()
    } = {},
    link = '',
    formatHeading = value => value
  } = {}) {
    super({label, link, value, formatHeading});
    this.url = url;
    this.from = from;
    this.to = to;
    this.update(this.from, this.to);
  }

  async update(from, to) {
    const url = this.getUrl(from, to);
    const data = await fetchJson(url);
    const values = Object.values(data);
    super.update(values);
    return data;
  }

  getUrl(from, to) {
    const searchParams = new URLSearchParams({to: to.toISOString(), from: from.toISOString()});
    return `${BACKEND_URL}/${this.url}?${searchParams}`;
  }
}
