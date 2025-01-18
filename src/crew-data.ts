export interface CrewMember {
  first_name: string;
  last_name: string;
  nationality: string;
  title: CrewMemberTitle;
  days_on_board: number;
  daily_rate: number;
  currency: 'USD' | 'EUR' | 'GBP';
  total_income: number;
  certificates: CrewMemberCertificate[];
}

export interface CrewMemberTitle {
  name: string;
  description: string;
}

export interface CrewMemberCertificate {
  title: string;
  issue_date: Date;
  expiration_date?: Date;
  description: string;
}
