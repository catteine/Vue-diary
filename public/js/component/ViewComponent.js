export default {
    template : '#view-page',
    props : ['page', 'isview'],
    data() {
        return {
            pageItem : this.page,
            isView : this.isview
        }
    },
    methods : {
        replaceStringWithHTML(dText) {
            var str = dText.split(' ').join('&nbsp;');
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
            return str;
        },
        replaceHTMLWithString(dText) {
            var str = dText.split('&nbsp;').join(' ');
            str = str.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
            return str;
        },
        modifyPage() {
            this.$emit('@modifypage');
        },
        deleteItem() {
            this.$emit('@deleteitem', 'delete');
        },
        backToList() {
            this.$emit('@backtolist');
        }
    }
}