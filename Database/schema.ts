import { date, integer, pgTable, text, time, varchar } from "drizzle-orm/pg-core";

export const pnr = pgTable('pnr', {
    pnr: varchar('pnr', { length: 10 }).primaryKey().notNull(), 
    dob: date('dob').notNull(), 
    doj: date('doj').notNull(),
    timedep : time('timedep').notNull(),
    timearr : time('timearr').notNull(),
    airlines : text('airlines').notNull(),
    depurture: text('depurture').notNull(),
    arrival: text('arrival').notNull(),
    cost : integer('cost'),
    markup : integer('marup'),
    portal : text('portal')
});

export const passenger = pgTable('passenger',{
    name:text('name').notNull(),
    passport : varchar('passport',{length : 8}),
    visa : varchar('visa',{length : 9}),
    visaex : date('visaex'),
    pnr : varchar('pnr',{length:10}).notNull().references(() => pnr.pnr)
})