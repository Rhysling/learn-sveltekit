<svelte:options runes={true} />

<script lang="ts">
	import Modal from "./Modal.svelte";

	type EditPwProps = {
		userIn: UserClientRemote | undefined;
		savePw: (ul: UserLogin) => Promise<boolean>;
		openSetPw: (email: string, isOpen: boolean) => void;
	};

	let { userIn, savePw, openSetPw }: EditPwProps = $props();

	let pw = $state("");

	let userLogin: UserLogin = $derived({
		email: userIn?.email ?? "",
		pw,
	});

	let isValidPw: ValidationState = $state(undefined);
	let submitErrorMessage = $state("");

	const validatePw = () => {
		if (!pw) {
			isValidPw = false;
			return;
		}
		pw = pw.trim();
		isValidPw = pw.length >= 6;
	};

	const save = async () => {
		validatePw();
		if (isValidPw) {
			const ok = await savePw(userLogin);
			if (!ok) {
				submitErrorMessage = "Failed to update password. Please try again.";
				return;
			}
			isValidPw = undefined;
			openSetPw(userLogin.email, false);
		}
	};

	const cancel = () => {
		pw = "";
		isValidPw = undefined;
		openSetPw(userLogin.email, false);
	};
</script>

<Modal isOpen={true} disableHideModal={true}>
	<div class="sign-in">
		<div class="title">Set Password</div>
		<div class="subtitle">
			{userIn?.fullName || "No name"} ({userIn?.email || "No email"})
		</div>

		<div>
			<input
				id="login-pw"
				type="password"
				class:info={isValidPw === undefined}
				class:success={isValidPw === true}
				class:error={isValidPw === false}
				onblur={validatePw}
				placeholder="Password"
				bind:value={pw}
			/>
		</div>

		<div>
			<button onclick={save} disabled={isValidPw === false}>Save</button>
			<button onclick={cancel} class="secondary">Cancel</button>
		</div>
		<div class="error">{submitErrorMessage}&nbsp;</div>
	</div>
</Modal>

<style lang="scss">
	@use "../styles/_custom-variables" as c;
	@use "sass:color";

	.sign-in {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		padding: 1.2rem;
		background-color: c.$body-background;
		border: 2px solid c.$main-darker;
		border-radius: 0.5rem;
		box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
		width: min(500px, 80vw);

		.title {
			font-size: 1.5rem;
			font-weight: bold;
			text-align: center;
			text-wrap: balance;

			@media only screen and (width <= c.$bp-small) {
				font-size: 1.2rem;
			}
		}

		.subtitle {
			margin: 0.5rem 0 0;
			font-size: 1.25rem;
			font-weight: bold;
			text-align: center;
			text-wrap: balance;

			@media only screen and (width <= c.$bp-small) {
				font-size: 0.9rem;
			}
		}

		input {
			margin: 1.5rem 0 0.5rem;
			text-align: center;
			width: min(300px, 60vw);
		}

		button {
			margin: 1rem 0.1rem 0;
		}
	}

	.error {
		margin: 0.25rem 0 0;
		color: c.$color-error;
		font-size: 0.85rem;
	}

	@media only screen and (width <= c.$bp-small) {
	}
</style>
