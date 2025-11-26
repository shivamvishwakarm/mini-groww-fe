/**
 * Format large numbers into human-readable format
 * Indian numbering system: Lakhs, Crores
 */
export function formatMarketCap(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num)) return 'N/A';

    // Convert to crores (1 Cr = 10 million)
    const crores = num / 10000000;

    if (crores >= 100000) {
        // Lakh Crores
        return `₹${(crores / 100000).toFixed(2)} Lakh Cr`;
    } else if (crores >= 1000) {
        // Thousands of Crores
        return `₹${(crores / 1000).toFixed(2)} K Cr`;
    } else if (crores >= 1) {
        // Crores
        return `₹${crores.toFixed(2)} Cr`;
    } else {
        // Lakhs
        const lakhs = num / 100000;
        return `₹${lakhs.toFixed(2)} L`;
    }
}

/**
 * Format currency with Indian number system
 */
export function formatIndianCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
}
