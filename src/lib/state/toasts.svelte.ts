class ToastState {
	items = $state<{ id: number; message: string }[]>([]);
	nextId = 0;

	push(message: string, durationMs = 3000) {
		const id = this.nextId++;
		this.items = [...this.items, { id, message }];
		setTimeout(() => this.dismiss(id), durationMs);
	}

	dismiss(id: number) {
		this.items = this.items.filter(t => t.id !== id);
	}
}

export const toasts = new ToastState();