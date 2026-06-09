
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const DATABASE_URL: string;
	export const JWT_SECRET: string;
	export const add_path: string;
	export const add_to_path: string;
	export const aliases: string;
	export const ALLUSERSPROFILE: string;
	export const ANSICON: string;
	export const ANSICON_DEF: string;
	export const APPDATA: string;
	export const architecture_bits: string;
	export const BotanicaStoreAdminPw: string;
	export const BotanicaStoreDb_ConnectionString: string;
	export const ccall: string;
	export const cexec: string;
	export const clink_architecture: string;
	export const CLINK_COMPLETIONS_DIR: string;
	export const CMDER_ALIASES: string;
	export const CMDER_CLINK: string;
	export const CMDER_CONFIGURED: string;
	export const CMDER_CONFIG_DIR: string;
	export const CMDER_INIT_END: string;
	export const CMDER_INIT_START: string;
	export const CMDER_ROOT: string;
	export const CMDER_SHELL: string;
	export const CMDER_USER_FLAGS: string;
	export const COLOR: string;
	export const COLUMNS: string;
	export const CommonProgramFiles: string;
	export const CommonProgramW6432: string;
	export const COMPUTERNAME: string;
	export const ComSpec: string;
	export const ConEmuANSI: string;
	export const ConEmuAnsiLog: string;
	export const ConEmuArgs: string;
	export const ConEmuArgs2: string;
	export const ConEmuBackHWND: string;
	export const ConEmuBaseDir: string;
	export const ConEmuBaseDirShort: string;
	export const ConEmuBuild: string;
	export const ConEmuCfgDir: string;
	export const ConEmuConfig: string;
	export const ConEmuDir: string;
	export const ConEmuDrawHWND: string;
	export const ConEmuDrive: string;
	export const ConEmuHooks: string;
	export const ConEmuHWND: string;
	export const ConEmuPalette: string;
	export const ConEmuPID: string;
	export const ConEmuServerPID: string;
	export const ConEmuTask: string;
	export const ConEmuWorkDir: string;
	export const ConEmuWorkDrive: string;
	export const currenArgu: string;
	export const debug_output: string;
	export const depth: string;
	export const DriverData: string;
	export const EDITOR: string;
	export const EFC_13580_1592913036: string;
	export const EFC_13580_2946480783: string;
	export const EFC_13580_4126798990: string;
	export const ESC: string;
	export const fast_init: string;
	export const feFlagName: string;
	export const feNot: string;
	export const find_query: string;
	export const found: string;
	export const full_path: string;
	export const git_executable: string;
	export const GIT_INSTALL_ROOT: string;
	export const git_locale: string;
	export const GIT_VERSION_USER: string;
	export const GIT_VERSION_VENDORED: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const INIT_CWD: string;
	export const IsProductionString: string;
	export const IS_PRODUCTION: string;
	export const Jwt__Key: string;
	export const LANG: string;
	export const lib_base: string;
	export const lib_console: string;
	export const lib_git: string;
	export const lib_path: string;
	export const lib_profile: string;
	export const LINES: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const MAILGUN_AUTH_VALUE: string;
	export const MAILGUN_FROM_DOMAIN: string;
	export const max_depth: string;
	export const nix_tools: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const NODE_EXE: string;
	export const NPM_CLI_JS: string;
	export const npm_command: string;
	export const npm_config_allow_scripts: string;
	export const npm_config_cache: string;
	export const npm_config_globalconfig: string;
	export const npm_config_global_prefix: string;
	export const npm_config_init_module: string;
	export const npm_config_local_prefix: string;
	export const npm_config_node_gyp: string;
	export const npm_config_noproxy: string;
	export const npm_config_npm_version: string;
	export const npm_config_prefix: string;
	export const npm_config_userconfig: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_json: string;
	export const npm_package_name: string;
	export const npm_package_version: string;
	export const NPM_PREFIX_JS: string;
	export const NPM_PREFIX_NPM_CLI_JS: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const OLD_PATH: string;
	export const OneDrive: string;
	export const OneDriveConsumer: string;
	export const OS: string;
	export const Path: string;
	export const PATHEXT: string;
	export const path_position: string;
	export const PLINK_PROTOCOL: string;
	export const Polson__AdminPw: string;
	export const Polson__IsProductionString: string;
	export const position: string;
	export const print_debug: string;
	export const print_error: string;
	export const print_verbose: string;
	export const print_warning: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const ProgramData: string;
	export const ProgramFiles: string;
	export const ProgramW6432: string;
	export const PROMPT: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const SESSIONNAME: string;
	export const SVN_SSH: string;
	export const SystemDrive: string;
	export const SystemRoot: string;
	export const TEMP: string;
	export const time_init: string;
	export const TMP: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const user_aliases: string;
	export const USER_BUILD: string;
	export const USER_MAJOR: string;
	export const USER_MINOR: string;
	export const USER_PATCH: string;
	export const VENDORED_BUILD: string;
	export const VENDORED_MAJOR: string;
	export const VENDORED_MINOR: string;
	export const VENDORED_PATCH: string;
	export const verbose_output: string;
	export const windir: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		DATABASE_URL: string;
		JWT_SECRET: string;
		add_path: string;
		add_to_path: string;
		aliases: string;
		ALLUSERSPROFILE: string;
		ANSICON: string;
		ANSICON_DEF: string;
		APPDATA: string;
		architecture_bits: string;
		BotanicaStoreAdminPw: string;
		BotanicaStoreDb_ConnectionString: string;
		ccall: string;
		cexec: string;
		clink_architecture: string;
		CLINK_COMPLETIONS_DIR: string;
		CMDER_ALIASES: string;
		CMDER_CLINK: string;
		CMDER_CONFIGURED: string;
		CMDER_CONFIG_DIR: string;
		CMDER_INIT_END: string;
		CMDER_INIT_START: string;
		CMDER_ROOT: string;
		CMDER_SHELL: string;
		CMDER_USER_FLAGS: string;
		COLOR: string;
		COLUMNS: string;
		CommonProgramFiles: string;
		CommonProgramW6432: string;
		COMPUTERNAME: string;
		ComSpec: string;
		ConEmuANSI: string;
		ConEmuAnsiLog: string;
		ConEmuArgs: string;
		ConEmuArgs2: string;
		ConEmuBackHWND: string;
		ConEmuBaseDir: string;
		ConEmuBaseDirShort: string;
		ConEmuBuild: string;
		ConEmuCfgDir: string;
		ConEmuConfig: string;
		ConEmuDir: string;
		ConEmuDrawHWND: string;
		ConEmuDrive: string;
		ConEmuHooks: string;
		ConEmuHWND: string;
		ConEmuPalette: string;
		ConEmuPID: string;
		ConEmuServerPID: string;
		ConEmuTask: string;
		ConEmuWorkDir: string;
		ConEmuWorkDrive: string;
		currenArgu: string;
		debug_output: string;
		depth: string;
		DriverData: string;
		EDITOR: string;
		EFC_13580_1592913036: string;
		EFC_13580_2946480783: string;
		EFC_13580_4126798990: string;
		ESC: string;
		fast_init: string;
		feFlagName: string;
		feNot: string;
		find_query: string;
		found: string;
		full_path: string;
		git_executable: string;
		GIT_INSTALL_ROOT: string;
		git_locale: string;
		GIT_VERSION_USER: string;
		GIT_VERSION_VENDORED: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		INIT_CWD: string;
		IsProductionString: string;
		IS_PRODUCTION: string;
		Jwt__Key: string;
		LANG: string;
		lib_base: string;
		lib_console: string;
		lib_git: string;
		lib_path: string;
		lib_profile: string;
		LINES: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		MAILGUN_AUTH_VALUE: string;
		MAILGUN_FROM_DOMAIN: string;
		max_depth: string;
		nix_tools: string;
		NODE: string;
		NODE_ENV: string;
		NODE_EXE: string;
		NPM_CLI_JS: string;
		npm_command: string;
		npm_config_allow_scripts: string;
		npm_config_cache: string;
		npm_config_globalconfig: string;
		npm_config_global_prefix: string;
		npm_config_init_module: string;
		npm_config_local_prefix: string;
		npm_config_node_gyp: string;
		npm_config_noproxy: string;
		npm_config_npm_version: string;
		npm_config_prefix: string;
		npm_config_userconfig: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_json: string;
		npm_package_name: string;
		npm_package_version: string;
		NPM_PREFIX_JS: string;
		NPM_PREFIX_NPM_CLI_JS: string;
		NUMBER_OF_PROCESSORS: string;
		OLD_PATH: string;
		OneDrive: string;
		OneDriveConsumer: string;
		OS: string;
		Path: string;
		PATHEXT: string;
		path_position: string;
		PLINK_PROTOCOL: string;
		Polson__AdminPw: string;
		Polson__IsProductionString: string;
		position: string;
		print_debug: string;
		print_error: string;
		print_verbose: string;
		print_warning: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		ProgramData: string;
		ProgramFiles: string;
		ProgramW6432: string;
		PROMPT: string;
		PSModulePath: string;
		PUBLIC: string;
		SESSIONNAME: string;
		SVN_SSH: string;
		SystemDrive: string;
		SystemRoot: string;
		TEMP: string;
		time_init: string;
		TMP: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		user_aliases: string;
		USER_BUILD: string;
		USER_MAJOR: string;
		USER_MINOR: string;
		USER_PATCH: string;
		VENDORED_BUILD: string;
		VENDORED_MAJOR: string;
		VENDORED_MINOR: string;
		VENDORED_PATCH: string;
		verbose_output: string;
		windir: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
