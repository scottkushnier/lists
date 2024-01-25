/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  traverse() {
    let s = "";
    s += `[`;
    let node = this.head;
    while (node != null) {
      s += node.val;
      if (node.next) {
        s += ",";
      }
      node = node.next;
    }
    s += `] (${this.length})`;
    return s;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const n = new Node(val);
    if (this.head) {
      this.tail.next = n;
      this.tail = n;
      this.length++;
    } else {
      this.head = n;
      this.tail = n;
      this.length = 1;
    }
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const n = new Node(val);
    if (this.head) {
      n.next = this.head;
      this.head = n;
      this.length++;
    } else {
      this.head = n;
      this.tail = n;
      this.length = 1;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.tail) {
      let current = this.head;
      let save_pop = this.tail.val;
      if (current.next) {
        while (current.next && current.next != this.tail) {
          current = current.next;
        }
        this.tail = current;
        current.next = null;
        this.length--;
      } else {
        // only one element, null it out
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      return save_pop;
    } else {
      console.error("can't pop from empty list");
      return null;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.head) {
      let save_pop = this.head.val;
      let current = this.head;
      if (current.next) {
        this.head = this.head.next;
        this.length--;
      } else {
        // only one element, null it out
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      return save_pop;
    } else {
      console.error("can't shift with empty list");
      return null;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0) {
      console.error(`no node at ${idx}`);
      return null;
    }
    let countdown = idx;
    let current = this.head;
    while (countdown > 0 && current) {
      current = current.next;
      countdown--;
    }
    if (current) {
      return current.val;
    } else {
      console.error(`no node at ${idx}`);
      return null;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0) {
      console.error(`no node at ${idx}`);
      return null;
    }
    let countdown = idx;
    let current = this.head;
    while (countdown > 0 && current) {
      current = current.next;
      countdown--;
    }
    if (current) {
      current.val = val;
    } else {
      console.error(`no node at ${idx}`);
      return null;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0) {
      console.error(`no node at ${idx}`);
      return null;
    }
    let countdown = idx;
    let current = this.head;
    let last_current = null;
    while (countdown > 0 && current) {
      last_current = current;
      current = current.next;
      countdown--;
    }
    if (countdown == 0) {
      // got to proper place, even if at end
      const n = new Node(val);
      if (last_current) {
        // if -not- at head, reroute around
        last_current.next = n;
      }
      n.next = current;
      // reset head & tail if necessary
      if (idx == 0) {
        this.head = n;
      }
      if (idx == this.length) {
        this.tail = n;
      }
      this.length++;
    } else {
      console.error(`no node at ${idx}`);
      return null;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
      console.error(`no node at ${idx}`);
      return null;
    }
    let countdown = idx;
    let current = this.head;
    let last_current = null;
    while (countdown > 0 && current) {
      last_current = current;
      current = current.next;
      countdown--;
    }
    // got to proper place, even if at end
    if (last_current && last_current.next) {
      // if -not- at head, reroute around
      last_current.next = last_current.next.next;
    }
    // reset head & tail if necessary
    if (idx == 0) {
      this.head = this.head.next;
    }
    if (idx == this.length - 1) {
      this.tail = last_current;
    }
    this.length--;
    return current.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let acc = 0;
    let num_numbers = 0;
    let node = this.head;
    while (node != null) {
      if (!isNaN(node.val)) {
        acc += node.val;
        num_numbers++;
      }
      node = node.next;
    }
    if (num_numbers) {
      return acc / num_numbers;
    } else {
      // console.error("no numbers in list to get average of");
      return 0;
    }
  }
}

// module.exports = LinkedList;
