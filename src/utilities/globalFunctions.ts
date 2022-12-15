import moment from 'moment';
import _ from 'lodash';
import { useGeneralStore } from '@/stores/generalStore';
import type { AnyNsRecord } from 'dns';

export const $humanizeDate = (date: Date) => {
    let formatted = moment(date);
    return moment(formatted).fromNow();
}
export const $LIPS = function () {//s is a boolean
    // this.$store.state.loader = this.$isProcessing = s;
    useGeneralStore().toggleLoader();
};

export const $emptyObject = function (o: any) {
    return _.isEmpty(o);
}