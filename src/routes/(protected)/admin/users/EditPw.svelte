<script lang="ts">
	import type {
		UserRemote,
		LoginRequestBody,
	} from "../../../../lib/types/auth";
	import type { ValidationState } from "../../../../lib/types/utility";

	type EditPwProps = {
		userIn: UserRemote | undefined;
		savePw: (ul: LoginRequestBody) => Promise<boolean>;
		openSetPw: (email: string, isOpen: boolean) => void;
	};

	let { userIn, savePw, openSetPw }: EditPwProps = $props();

	let pw = $state("");

	let userLogin: LoginRequestBody = $derived({
		email: userIn?.email ?? "",
		password: pw,
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

	const hideModalKey = (e: KeyboardEvent) => {
		if (e.code === "Escape") cancel();
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal" onkeyup={(e) => hideModalKey(e)}>
	<div class="content">
		<div class="sign-in">
			<div class="title">Set Password</div>
			<div class="subtitle">
				{userIn?.name || "No name"} ({userIn?.email || "No email"})
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
	</div>
</div>

<style lang="scss">
	@use "../../../../lib/styles/custom-variables" as c;

	.modal {
		position: fixed;
		display: flex;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
		justify-content: center;
		align-items: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 400px;
		min-height: 200px;
		max-width: 90vw;
		max-height: 90vh;
	}

	.sign-in {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		padding: 1.2rem;
		background-color: var(--background-main);
		border: 2px solid var(--main-darker);
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
		color: var(--color-error);
		font-size: 0.85rem;
	}

	@media only screen and (width <= c.$bp-small) {
	}
</style>
