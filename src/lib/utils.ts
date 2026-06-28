export const stringSortFn = (a: string, b: string) => {
	if (a > b) return 10;
	if (a < b) return -10;
	return 0;
};