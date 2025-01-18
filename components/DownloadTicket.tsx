"use client";

import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from './ui/button';

const DownloadButton = () => {
    const handleDownload = async () => {
        const element = document.getElementById('ticket'); 
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 }); 
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait', 
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ticket.pdf'); 
    };

    return <Button onClick={handleDownload} className="btn btn-primary">Download</Button>;
};

export default DownloadButton;
