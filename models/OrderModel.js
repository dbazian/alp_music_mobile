import moment from 'moment';

class OrderModel {
    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY');    }
}

export default OrderModel;