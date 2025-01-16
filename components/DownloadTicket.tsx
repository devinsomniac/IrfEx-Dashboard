"use client"; // Mark this as a Client Component

import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from './ui/button';

const DownloadButton = () => {
    const handleDownload = async () => {
        const element = document.getElementById('ticket'); // Select the div with id 'ticket'
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait', // A4 orientation
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ticket.pdf'); // Save the PDF with the desired filename
    };

    return <Button onClick={handleDownload} className="btn btn-primary">Download</Button>;
};

export default DownloadButton;
