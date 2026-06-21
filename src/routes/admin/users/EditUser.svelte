<script lang="ts">
	import type { UserRemote } from "../../../lib/types/auth";
	import type { ValidationState } from "../../../lib/types/utility";

	type EditUserProps = {
		userIn: UserRemote;
		userList: UserRemote[];
		isListEditMode: boolean;
		editingUserId: string;
		setEditMode: (userId: string, isEdit: boolean) => void;
		saveUser: (user: UserRemote) => void;
		destroyUser: (user: UserRemote) => void;
		openSetPw: (email: string, isOpen: boolean) => void;
	};

	let {
		userIn,
		userList,
		isListEditMode,
		editingUserId,
		setEditMode,
		saveUser,
		destroyUser,
		openSetPw,
	}: EditUserProps = $props();

	// *** State ***
	//svelte-ignore state_referenced_locally
	let userEdited: UserRemote = $state({ ...userIn });
	let isEditMode = $state(false);
	let isValidEmail: ValidationState = $state(undefined);
	let isValidFullName: ValidationState = $state(undefined);
	let isValidAll: ValidationState = $derived.by(() => {
		if (isValidEmail && isValidFullName) return true;
		if (isValidEmail === false || isValidFullName === false) return false;
		return undefined;
	});

	// ** Validations **
	const validateEmail = () => {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEdited.email)) {
			isValidEmail = false;
			return;
		}
		if (
			userList.some(
				(u) =>
					u.email.toLowerCase() === userEdited.email.toLowerCase() &&
					u.id !== userEdited.id,
			)
		) {
			isValidEmail = false;
			return;
		}
		isValidEmail = true;
	};

	const validateFullName = () => (isValidFullName = !!userEdited.name);
	const validateAll = () => {
		validateEmail();
		validateFullName();
	};

	// ** Edit / Save / Cancel **
	const edit = () => {
		setEditMode(userEdited.id, true);
		isEditMode = true;
	};

	const save = () => {
		validateAll();
		if (isValidAll) {
			saveUser(userEdited);
			userEdited = { ...userIn };
			setEditMode("", false);
			isValidEmail = undefined;
			isValidFullName = undefined;
			isEditMode = false;
		}
	};

	const cancel = () => {
		userEdited = { ...userIn };
		setEditMode("", false);
		isValidEmail = undefined;
		isValidFullName = undefined;
		isEditMode = false;
	};

	const destroy = () => {
		let isOk = confirm("Are you sure you want to destroy this user?");

		if (isOk) {
			destroyUser(userEdited);
			setEditMode("", false);
			isValidEmail = undefined;
			isValidFullName = undefined;
			isEditMode = false;
		}
	};
</script>

<div class="user-info">
	<div style:font-style={userEdited.id === "" ? "italic" : "normal"}>
		Id: {userEdited.id}
	</div>
	<div style:font-style={userEdited.id === "" ? "italic" : "normal"}>
		{userEdited.id === "" ? "New" : ""}
	</div>
	<div>Full Name:</div>
	<div>
		{#if isEditMode}<input
				type="text"
				class:info={isValidFullName === undefined}
				class:success={isValidFullName === true}
				class:error={isValidFullName === false}
				onblur={validateFullName}
				bind:value={
					() => userEdited.name, (v) => (userEdited.name = (v || "").trim())
				}
				placeholder="Full Name"
			/>
		{:else}{userIn.name}
		{/if}
	</div>
	<div>Email:</div>
	<div>
		{#if isEditMode}<input
				type="text"
				class:info={isValidEmail === undefined}
				class:success={isValidEmail === true}
				class:error={isValidEmail === false}
				onblur={validateEmail}
				bind:value={userEdited.email}
				placeholder="Email"
			/>
		{:else}{userIn.email}
		{/if}
	</div>
	<div>&nbsp;</div>
	<div>
		<span>
			{#if isEditMode && userEdited.id !== user.isAdmin}<span>Is Admin</span>
				<input
					type="checkbox"
					bind:checked={userEdited.isAdmin}
					style="width:auto;"
				/>
			{:else if userEdited.isAdmin}<span class="warning">Admin</span>{/if}
		</span>

		<span>
			{#if isEditMode && userEdited.id !== user.value?.id}<span
					>Is Disabled</span
				>
				<input
					type="checkbox"
					bind:checked={userEdited.isDisabled}
					style="width:auto;"
				/>
			{:else if userEdited.isDisabled}<span class="warning">Disabled</span>{/if}
		</span>

		<span>
			{#if isEditMode && userEdited.id !== user.value?.id}<span>Is Deleted</span
				>
				<input
					type="checkbox"
					bind:checked={userEdited.isDeleted}
					style="width:auto;"
				/>
			{:else if userEdited.isDeleted}<span class="warning">Deleted</span>{/if}
		</span>
		{#if !userIn.hasPw && userIn.id !== 0}
			<span class="warning">No Pw</span>
		{/if}
	</div>
	{#if isEditMode && userEdited.id !== 0 && userEdited.id !== user.value?.id}
		<div><button class="small" onclick={destroy}>Destroy</button></div>
	{/if}
	<div
		class="cover"
		class:visible={isListEditMode && userEdited.id !== editingUserId}
	></div>
</div>

<div class="pic-controls">
	{#if isEditMode}
		<div>
			<button onclick={save} disabled={isValidAll === false}>Save</button><br />
			<button onclick={cancel}>Cancel</button>
		</div>
	{:else}
		<div>
			<button onclick={edit}>Edit</button><br />
			{#if userEdited.id !== 0}<button
					onclick={() => openSetPw(userEdited.email, true)}>Set Pw</button
				>{/if}
		</div>
	{/if}
	<div
		class="cover"
		class:visible={isListEditMode && userEdited.id !== editingUserId}
	></div>
</div>

<style lang="scss">
	@use "../../../lib/styles/custom-variables" as c;

	.user-info {
		position: relative;
		display: grid;
		grid-template-columns: 6rem auto;
		padding: 0.5rem;
		line-height: 1.8rem;
		background-color: c.$light-background;

		> div {
			min-height: 1.5rem;
		}

		span {
			display: inline-block;
			margin: 0;
			padding: 0 1rem 0 0;
			min-width: 3rem;

			> span {
				padding: 0 0.25rem 0 0;
			}
		}

		input {
			// outline: 1px solid c.$color-info;
			// background-color: c.$color-info-bg;
			font-size: 0.9rem;
			width: min(300px, 80%);
			padding: 0.2rem 0.4rem;
		}
	}

	.pic-controls {
		position: relative;
		display: flex;
		align-items: center;

		button {
			margin: 0.3rem 0 0.3rem 0.6rem;
		}
	}

	.cover {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 10;
		display: none;

		&.visible {
			display: block;
		}
	}

	span {
		&.warning {
			font-style: italic;
			font-weight: bold;
			color: c.$color-warning;
			margin: 0 1rem 0 0;
		}
	}

	@media only screen and (width <= c.$bp-small) {
	}
</style>
