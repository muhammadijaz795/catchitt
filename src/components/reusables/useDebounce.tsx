import { useRef, useCallback } from "react";

// Debounce functions to prevent another call before the first one is done
// plus optional timed throttling
export default function useDebounce(callback: Function, throttleInSeconds?: number) {

	const isDone = useRef(true);
	const lastCall = useRef(new Date().getTime())
	const isFirstRun = useRef(true);

	const debounced = async (args: []) => {

		if (!isFirstRun.current) {
			if (throttleInSeconds && (new Date().getTime()) - lastCall.current < (throttleInSeconds * 1000)) {
				isFirstRun.current = false
				return true
			}
		}

		isFirstRun.current = false

		lastCall.current = new Date().getTime()

		if (isDone.current) {
			isDone.current = false;
			await callback(...args);
			isDone.current = true
		} else {
			return true
		}
	};

	const callBackedDebounce = useCallback((debouncedFunctionArgumentsArray: any) => debounced(debouncedFunctionArgumentsArray), [])

	return callBackedDebounce;
}