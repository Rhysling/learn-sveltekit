<script lang="ts">
	import type {
		UserRemote,
		LoginRequestBody,
	} from "../../../../lib/types/auth";
	//import { page } from "$app/state";
	import { getAuth } from "$lib/context/auth";
	import { invalidateAll } from "$app/navigation";
	import { untrack } from "svelte";
	import EditUser from "../users/EditUser.svelte";
	import EditPw from "../users/EditPw.svelte";

	let { data } = $props();
	let userList: UserRemote[] = $state(untrack(() => data.users));

	//let currentUser: AuthTokenPayload = $derived(page.data.user);
	const currentUser = getAuth();
	let isListEditMode = $state(false);
	let editingUserId = $state("");
	let isEditPw = $state(false);
	let userSetPw: UserRemote | undefined = $state(undefined);

	const setEditMode = (userId: string, isEdit: boolean) => {
		editingUserId = userId;
		isListEditMode = isEdit;
	};

	const saveUser = async (user: UserRemote) => {
		const formData = new FormData();
		formData.append("user", JSON.stringify(user));
		const res = await fetch("?/save", { method: "POST", body: formData });

		if (!res.ok) {
			alert(res.statusText);
			return;
		}

		await invalidateAll();
		userList = data.users;
	};

	const destroyUser = async (user: UserRemote) => {
		const formData = new FormData();
		formData.append("userId", user.id);
		const res = await fetch("?/destroy", { method: "POST", body: formData });

		if (!res.ok) {
			alert(res.statusText);
			return;
		}

		await invalidateAll();
		userList = data.users;
	};

	const openSetPw = (email: string, isOpen: boolean) => {
		userSetPw = userList.find((u) => u.email === email);
		isEditPw = isOpen;
	};

	const savePw = async (ul: LoginRequestBody): Promise<boolean> => {
		const formData = new FormData();
		formData.append("loginRequestBody", JSON.stringify(ul));
		const res = await fetch("?/savePw", { method: "POST", body: formData });

		if (!res.ok) {
			alert(res.statusText);
			return false;
		}

		await invalidateAll();
		userList = data.users;
		return true;

		// const ok = false; //await postUpdatePw(ul);
		// if (!ok) return false;
		// const ix = userList.findIndex(
		// 	(u) => u.email.toLocaleLowerCase() === ul.email.toLowerCase(),
		// );
		// if (ix >= 0) userList[ix].hasPw = true;
		// return true;
	};
</script>

<div class="title">Admin Users</div>
<div class="user-list">
	{#each userList as user (user.id)}
		<EditUser
			userIn={user}
			{userList}
			{currentUser}
			{isListEditMode}
			{editingUserId}
			{setEditMode}
			{saveUser}
			{destroyUser}
			{openSetPw}
		/>
	{/each}
</div>

{#if isEditPw}
	<EditPw userIn={userSetPw} {savePw} {openSetPw} />
{/if}

<style lang="scss">
	@use "../../../../lib/styles/custom-variables" as c;

	.title {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		margin: 1rem auto;
	}

	.user-list {
		display: grid;
		grid-template-columns: 1fr 7rem;
		gap: 0.5rem 0;
		max-width: 600px;
		margin: 1rem auto;
		// border-top: 1px solid black;
		// border-bottom: 1px solid black;
	}

	@media only screen and (width <= c.$bp-small) {
	}
</style>
