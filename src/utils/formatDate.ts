export const formatDate = (dateString?: string): string => {
    if (!dateString) return '-';

    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };