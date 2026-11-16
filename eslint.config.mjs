import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-restricted-types": [
				"error",
				{
					types: {
						unknown: {
							message: "Arbitrary 'unknown' type annotations are forbidden; define and validate a concrete type.",
						},
						object: {
							message: "Arbitrary 'object' type annotations are forbidden; define a concrete interface or type.",
						},
						"{}": {
							message: "Empty object '{}' type annotations are forbidden; define a concrete interface or type.",
						},
						Function: {
							message: "Arbitrary 'Function' type annotations are forbidden; write a concrete function signature.",
						},
					},
				},
			],
		},
	},
);
