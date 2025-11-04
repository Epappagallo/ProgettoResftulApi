import react from 'react';

interface FooterProps {
    copyrightYear?: number;
}

const Footer: React.FC<FooterProps> = ({ copyrightYear = new Date().getFullYear() }) => {
    ret