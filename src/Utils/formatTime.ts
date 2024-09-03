function formatTime(seconds: number) {
    const date = new Date(seconds * 1000);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const remainingSeconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

export { formatTime }
