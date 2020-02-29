export default {
    template : '#list-page',
    props : ['data'],
    data() {
        return {
            itemList : this.data,
            summaryLimit : 30,
        }
    },
    methods : {
        createSummary(dText) {
            var text = dText.slice(0, this.summaryLimit);
            if (dText.length > this.summaryLimit) {
                text = text + "...";
            }
            return text;
        },
        viewPage(item) {
            this.$emit('@viewpage', item);
        }
    }
}