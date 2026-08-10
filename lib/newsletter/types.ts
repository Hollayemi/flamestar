export type NewsletterIndicatorRow = {
  label: string;
  value: string;
  note?: string;
};

export type NewsletterBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string } // section heading, e.g. "01 NIGERIAN MARKET SNAPSHOT"
  | { type: "subheading"; text: string } // sub-section heading, e.g. "FIXED INCOME WATCH"
  | { type: "table"; title?: string; rows: NewsletterIndicatorRow[] } // Key Market Indicators style table
  | { type: "list"; items: string[] } // numbered strategy steps
  | { type: "quote"; text: string };
