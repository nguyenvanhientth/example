import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    withTiming,
    useDerivedValue,
    interpolate,
    withDelay,
    Easing,
} from 'react-native-reanimated';
export const SIZE = 70;
export const BASE_WIDTH = 50;
export const BASE_TRANSLATE_Y = 15;
export const WIDTH_TOP = 30;
export const WIDTH_BOTTOM = 20;
const sharedBin = (value: boolean): 0 | 1 => {
    'worklet';
    return value ? 1 : 0;
};

export const useSharedTransition = (
    state: boolean | number,
    config?: Animated.WithTimingConfig,
    delay = 0
): Animated.SharedValue<number> => {
    const value = useSharedValue(0);
    useEffect(() => {
        value.value = typeof state === 'boolean' ? sharedBin(state) : state;
    }, [state, value]);
    return useDerivedValue(() =>
        withDelay(
            delay,
            withTiming(
                value.value,
                Object.assign(
                    { duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1) },
                    config
                )
            )
        )
    );
};

export const useInterpolate = (
    progress: Animated.SharedValue<number>,
    input: number[],
    output: number[],
    type?: Animated.Extrapolate
) => useDerivedValue(() => interpolate(progress.value, input, output, type));