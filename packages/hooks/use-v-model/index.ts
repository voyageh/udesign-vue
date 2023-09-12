import { ref, computed } from "vue";

export const useVModel = <P extends object, K extends keyof P, Name extends string>(
  props: P,
  key: K,
  emit: (name: Name, ...args: any[]) => void
) => {
  if (!props[key]) {
    return ref<Record<string, any>>({});
  }

  const event = `update:${key.toString()}` as Name;
  return computed<NonNullable<P[K]>>({
    get() {
      return new Proxy(props[key], {
        get(target, prop) {
          return Reflect.get(target, prop);
        },
        set(target, prop, value) {
          emit(event, {
            ...target,
            [prop]: value,
          });
          return true;
        },
      });
    },
    set(val) {
      emit(event, val);
    },
  });
};
