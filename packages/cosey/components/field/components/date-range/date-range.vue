<script lang="ts">
import { ElDatePicker } from 'element-plus';
import { defineComponent, h, mergeProps, type SlotsType } from 'vue';
import { type FieldDateRangeProps, type FieldDateRangeSlots } from './date-range';
import dayjs from 'dayjs';
import { addNullablePlaceholder, DATE_FORMAT } from '../../../../utils';
import { useLocale } from '../../../../hooks';

export default defineComponent(
  (props: FieldDateRangeProps, { slots }) => {
    const { t } = useLocale();

    return () => {
      if (props.readonly) {
        const value = props.componentProps?.modelValue;
        return addNullablePlaceholder(value, (val) =>
          val.map((item: any) => dayjs(item).format(DATE_FORMAT)).join(' - '),
        );
      }

      return h(
        ElDatePicker,
        mergeProps(
          {
            startPlaceholder: t('co.common.pleaseSelect'),
            endPlaceholder: t('co.common.pleaseSelect'),
            defaultTime: [new Date(0, 0, 1, 0, 0, 0), new Date(0, 0, 1, 23, 59, 59)],
            style: {
              display: 'flex',
              width: '100%',
            },
          },
          props.componentProps ?? {},
          {
            type: 'daterange',
          },
        ),
        slots,
      );
    };
  },
  {
    name: 'FieldDateRange',
    inheritAttrs: false,
    props: ['componentProps', 'componentSlots', 'readonly'],
    slots: {} as SlotsType<FieldDateRangeSlots>,
  },
);
</script>
