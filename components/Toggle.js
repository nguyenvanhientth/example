import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import {
    SIZE,
    BASE_WIDTH,
    WIDTH_BOTTOM,
    WIDTH_TOP,
    BASE_TRANSLATE_Y,
    useInterpolate,
    useSharedTransition,
} from './constants';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    interpolate,
} from 'react-native-reanimated';

const LineTop = ({ active, progress }) => {
    const width = useInterpolate(progress, [0, 1], [WIDTH_TOP, BASE_WIDTH]);
    const translateY = useInterpolate(progress, [0, 1], [-BASE_TRANSLATE_Y, 0]);
    const rotate = useInterpolate(progress, [0, 1], [0, 45]);

    const style = useAnimatedStyle(() => ({
        width: width.value,
        transform: [
            { translateY: translateY.value },
            { rotate: `${rotate.value}deg` },
        ],
    }));

    return <Animated.View style={[styles.line, style]} />;
};

const LineMiddle = ({ active, progress }) => {
    const width = useSharedValue(BASE_WIDTH);
    const translateX = useInterpolate(progress, [0, 1], [0, SIZE]);

    const style = useAnimatedStyle(() => ({
        width: width.value,
        transform: [{ translateX: translateX.value }],
    }));

    return <Animated.View style={[styles.line, style]} />;
};

const LineBottom = ({ active, progress }) => {
    const width = useInterpolate(progress, [0, 1], [WIDTH_BOTTOM, BASE_WIDTH]);
    const translateY = useInterpolate(progress, [0, 1], [BASE_TRANSLATE_Y, 0]);
    const rotate = useInterpolate(progress, [0, 1], [0, 315]);
    const style = useAnimatedStyle(() => ({
        width: width.value,
        transform: [
            { translateY: translateY.value },
            { rotate: `${rotate.value}deg` },
        ],
    }));

    return <Animated.View style={[styles.line, style]} />;
};

export const Toggle = () => {
    const [active, setActive] = useState(false);
    const progresTop = useSharedTransition(active, undefined, 125);
    const progressMiddle = useSharedTransition(active);
    const progressBottom = useSharedTransition(active, undefined, 125);
    const onToggle = () => {
        setActive((v) => !v);
    };

    return (
        <TouchableWithoutFeedback onPress={onToggle}>
            <View style={styles.wrap}>
                <LineTop active={active} progress={progresTop} />
                <LineMiddle active={active} progress={progressMiddle} />
                <LineBottom active={active} progress={progressBottom} />
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    line: {
        height: 5,
        borderRadius: 4,
        backgroundColor: '#3498db',
        position: 'absolute',
        left: 12,
    },
    wrap: {
        width: SIZE,
        height: SIZE,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        justifyContent: 'center',
    },
});
