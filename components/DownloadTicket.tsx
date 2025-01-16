"use client"
import React from 'react';
import puppeteer from 'puppeteer';
import { Button } from './ui/button';

const DownloadButton = () => {
    const handleDownload = async () => {
        const element = document.getElementById('ticket'); // Select the div with id 'ticket'
        if (!element) return;

        // Launch Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // HTML content to be printed
        await page.setContent(element.outerHTML);

        // Set the desired PDF dimensions and options
        const pdfOptions = {
            format : 'A4', // Corrected to use predefined PaperFormat
            printBackground: true,
        };

        // Generate the PDF
        const pdf = await page.pdf(pdfOptions);

        // Close the browser
        await browser.close();

        // Trigger the download
        const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'ticket.pdf';
        link.click();
        URL.revokeObjectURL(pdfUrl);
    };

    return <Button onClick={handleDownload} className="btn btn-primary">Download</Button>;
};

export default DownloadButton;
