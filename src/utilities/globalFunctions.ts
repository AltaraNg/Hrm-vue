import moment from 'moment';
import { useGeneralStore } from '@/stores/generalStore';

export const $humanizeDate = (date: Date) => {
    let formatted = moment(date);
    return moment(formatted).fromNow();
}
export const $LIPS = function () {//s is a boolean
    // this.$store.state.loader = this.$isProcessing = s;
   useGeneralStore().toggleLoader();
};