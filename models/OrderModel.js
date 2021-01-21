import moment from "moment";

class OrderModel {
  constructor(id, items, date) {
    this.id = id;
    this.items = items;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY");
  }
}

export default OrderModel;
