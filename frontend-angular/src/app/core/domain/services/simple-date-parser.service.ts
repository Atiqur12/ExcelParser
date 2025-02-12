interface DateComponents {
  day: number;
  month: number;
  year: number;
}

export class SimpleDateParserService {
  private static readonly DELIMITER: RegExp = /[\/\-]/;
  private static readonly TOKEN_MAP: { [token: string]: keyof DateComponents } = {
    'dd': 'day',
    'MM': 'month',
    'yyyy': 'year'
  };

  constructor(private readonly format: string) {
    this.format = format;
  }

  public parse(dateString: string): Date | null {
    const formatParts = this.format.split(SimpleDateParserService.DELIMITER);
    const dateParts = dateString.split(SimpleDateParserService.DELIMITER);
    if (formatParts.length !== dateParts.length) return null;

    const components = this.extractComponents(formatParts, dateParts);
    if (!components) return null;

    return this.buildDate(components);
  }

  private extractComponents(formatParts: string[], dateParts: string[]): DateComponents | null {
    if (formatParts.length !== dateParts.length) return null;

    const components = this.parseComponents(formatParts, dateParts);
    if (!components) return null;

    return this.validateComponents(components);
  }

  private parseComponents(formatParts: string[], dateParts: string[]): Partial<DateComponents> | null {
    const components: Partial<DateComponents> = {};

    for (let i = 0; i < formatParts.length; i++) {
      const parsed = this.parseComponent(formatParts[i], dateParts[i]);
      if (!parsed) return null;
      const [key, value] = parsed;
      components[key] = value;
    }

    return components;
  }

  private parseComponent(token: string, datePart: string): [keyof DateComponents, number] | null {
    const key = SimpleDateParserService.TOKEN_MAP[token];
    if (!key) return null;

    const value = parseInt(datePart, 10);
    return isNaN(value) ? null : [key, value];
  }

  private validateComponents(components: Partial<DateComponents>): DateComponents | null {
    if (
      components.day === undefined ||
      components.month === undefined ||
      components.year === undefined
    ) {
      return null;
    }

    return {
      day: components.day,
      month: components.month,
      year: components.year,
    };
  }

  private buildDate({day, month, year}: DateComponents): Date | null {
    const date = new Date(Date.UTC(year, month - 1, day));
    return this.isValidDate({day, month, year}, date) ? date : null;
  }

  private isValidDate(components: DateComponents, date: Date): boolean {
    return (
      date.getUTCFullYear() === components.year &&
      date.getUTCMonth() === components.month - 1 &&
      date.getUTCDate() === components.day
    );
  }
}
