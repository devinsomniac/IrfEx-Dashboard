import { boolean, date, integer, pgTable, text, time, varchar } from "drizzle-orm/pg-core";

export const pnr = pgTable('pnr', {
    pnrdata: text('pnrdata').notNull(),
    dob: date('dob').notNull(),
    doj: date('doj').notNull(),
    timedep: time('timedep').notNull(),
    timearr: time('timearr').notNull(),
    airlines: text('airlines').notNull(),
    departure_name: text('departure_name').notNull(),
    departure_address: text('departure_address').notNull(),
    arrival_name: text('arrival_name').notNull(),
    arrival_address: text('arrival_address').notNull(),
    cost: integer('cost'),
    markup: integer('markup'),
    portal: text('portal'),
    transit: boolean('transit'),
    transitairport: text('transitairport'),
    flight_number: varchar('flight_number', { length: 20 }).notNull(),
    flight_duration : text('flight_duration').notNull()
});

export const passenger = pgTable('passenger', {
    name: text('name').notNull(),
    passport: varchar('passport', { length: 8 }),
    visa: varchar('visa', { length: 9 }),
    visaex: date('visaex'),
    pnr: varchar('pnr', { length: 10 }).notNull().references(() => pnr.pnrdata),
});

export interface Pnr {
    pnrdata: string;
    dob: Date;
    doj: Date;
    timedep: string; 
    timearr: string;
    airlines: string;
    departure_name: string;
    departure_address: string;
    arrival_name: string;
    arrival_address: string;
    cost?: number;
    markup?: number;
    portal?: string;
    transit?: boolean;
    transitairport?: string;
    flight_number: string;
    flight_duration: string;
}

export interface Passenger {
    name: string;
    passport?: string;
    visa?: string;
}
