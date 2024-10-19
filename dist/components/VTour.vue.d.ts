import { ComputedRef } from 'vue';
import { ITourStep } from '../Types.ts';

export interface IVTourProps {
    name?: string;
    steps: ITourStep[];
    backdrop?: boolean;
    autoStart?: boolean;
    startDelay?: number;
    highlight?: boolean;
    margin?: number;
    buttonLabels?: {
        next: string;
        back: string;
        done: string;
        skip: string;
    };
    saveToLocalStorage?: 'never' | 'step' | 'end';
    hideSkip?: boolean;
    hideArrow?: boolean;
    noScroll?: boolean;
}
export interface IVTourData {
    currentStep: number;
    lastStep: number;
    nextStep: number;
    getCurrentStep: ComputedRef<ITourStep>;
    getLastStep: ComputedRef<ITourStep>;
    getNextStep: ComputedRef<ITourStep>;
}
declare function startTour(): void;
declare function stopTour(): void;
declare function resetTour(restart: boolean): void;
declare function nextStep(): Promise<void>;
declare function lastStep(): Promise<void>;
declare function endTour(): void;
declare function goToStep(step: number): void;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<__VLS_TypePropsToRuntimeProps<IVTourProps>, {
    startTour: typeof startTour;
    nextStep: typeof nextStep;
    lastStep: typeof lastStep;
    endTour: typeof endTour;
    stopTour: typeof stopTour;
    goToStep: typeof goToStep;
    resetTour: typeof resetTour;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onTourStart: () => void;
    onTourEnd: () => void;
    onTourStep: () => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<IVTourProps>>> & {
    onOnTourStart?: (() => any) | undefined;
    onOnTourEnd?: (() => any) | undefined;
    onOnTourStep?: (() => any) | undefined;
}, {}, {}>, {
    content?(_: {
        _CurrentStep: {
            currentStep: number;
            lastStep: number;
            nextStep: number;
            getCurrentStep: ITourStep;
            getLastStep: ITourStep;
            getNextStep: ITourStep;
        };
    }): any;
    actions?(_: {
        lastStep: typeof lastStep;
        nextStep: typeof nextStep;
        endTour: typeof endTour;
        _CurrentStep: {
            currentStep: number;
            lastStep: number;
            nextStep: number;
            getCurrentStep: ITourStep;
            getLastStep: ITourStep;
            getNextStep: ITourStep;
        };
        getNextLabel: String;
        props: import('vue').DefineProps<import('@vue/shared').LooseRequired<IVTourProps>, "backdrop" | "autoStart" | "highlight" | "hideSkip" | "hideArrow" | "noScroll">;
    }): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
