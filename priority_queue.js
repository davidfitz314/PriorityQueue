//by David ChenFitzgerald 8-24-2017//
// Basic(complete)
// find-max or find-min: find a maximum item of a max-heap, or a minimum item of a min-heap, respectively (a.k.a. peek)
// insert: adding a new key to the heap (a.k.a., push[2])
// extract-max [or extract-min]: returns the node of maximum value from a max heap [or minimum value from a min heap] after removing it from the heap (a.k.a., pop[3])
// delete-max [or delete-min]: removing the root node of a max heap [or min heap], respectively
// replace: pop root and push a new key. More efficient than pop followed by push, since only need to balance once, not twice, and appropriate for fixed-size heaps.[4]

// Creation(complete)
// create-heap: create an empty heap

// Inspection(complete)
// size: return the number of items in the heap.
// is-empty: return true if the heap is empty, false otherwise.

// Internal(complete)
// increase-key or decrease-key: updating a key within a max- or min-heap, respectively
// delete: delete an arbitrary node (followed by moving last node and sifting to maintain heap)
// sift-up: move a node up in the tree, as long as needed; used to restore heap condition after insertion. Called "sift" because node moves up the tree until it reaches the correct level, as in a sieve.
// sift-down: move a node down in the tree, similar to sift-up; used to restore heap condition after deletion or replacement.

//node
class Node {
    constructor(val){
        this.value = val;
        this.priority = val;
        //no next property all balancing is done within the heap
    }
}

//create an empty heap list
function BinaryHeap() {
    this.myList = [];
    this.store = {};
}
 
//everything that happens in the binary heap
BinaryHeap.prototype = {
    //find size of the heap
    size: function() {
        return this.myList.length;
    },
    
    //check if heap is empty
    isEmptyBH: function() {
        if (this.myList.length === 0){
            return true;
        } 
        return false;
    },
    
    //insert a new key into the heap
    insert: function(element){
        myNode = new Node(element);
        
        //test if heap is empty
        if (this.isEmptyBH()){
            this.myList.push(myNode);
            myNode.nIndex = 0;
            this.store[myNode.value] = myNode;
            return;
        }
        //console.log(this.size());
        
        //test if element is already in the heap
        if (myNode.value in this.store){
            //if in heap search for location of element
            var n = this.find_update(myNode);
            if (!n){
                console.log("false duplicate",myNode.value);
                return;
            }
            return;                
        } 
        
        //if not already in heap insert into bottom of heap then bubble up.
        this.myList.push(myNode);
        myNode.nIndex = this.size()-1;
        this.store[element] = myNode;
        this.bubble(this.size() -1);
        //console.log("current max",this.myList[0]);
        return
    },

    //Uses the lookup table to find the index of each element, then updates the heap.
    find_update: function(element) {
        //finds specific element in heap and updates its priority
        if (this.store[element.value]){
            //update element priority
            var index = this.store[element.value].nIndex;
            this.myList[index].priority += 1;
            //bubble up if necessary
            this.bubble(index);
            return true;
        }
        
        return false;
    },
    
    bubble: function(new_size) {
        //moves the element up to the correct position
        //get element
        var element = this.myList[new_size];
        if (!element){
            return;
        }
        //highest point is index 0
        while (new_size > 0){
            //grab parent node
            var p_location = Math.floor((new_size+1) / 2) -1 ;
            
            var parent = this.myList[p_location];
            //test parent priority
            if (parent.priority >= element.priority){
                break;
            }
            //console.log("swap", element.value, " ", parent.value);
            //swap parent with child
            this.myList[p_location] = element;
            this.myList[new_size] = parent;
            
            //update indexes of both parent and child in store
            this.store[element.value].nIndex = p_location;
            this.store[parent.value].nIndex = new_size;
            //continue bubble
            new_size = p_location;
        }
    },
        remove: function() {
        //pop the max-priority off the queue
        //var max_index = this.find_max(this.myList[0]);
        
        this.deleteNode(0);
        //test for single element in heap
        if (this.size() == 1){
            this.myList.pop();
            return;
        }
        
        var last = this.myList.pop();
        //delete from object/hash table
        this.store[last.value] === undefined;
        delete this.store[last.value];
        
        //replace empty spot with element from bottom then sink it down again
        this.myList[0] = last;
        this.myList[0].nIndex = 0;
        this.sink(0);
        
    },
    
    //Lowers an element with low priority to the correct position in the heap
    sink: function(location) {
        //grab the element to be sunk
        var element = this.myList[location];
        
        while(true){
            //compute child elements
            var childR_loc = (location + 1) *2;
            var childL_loc = childR_loc - 1;
            
            var swap = null;
            var swap_index = -1;
            //test if left child is within the heap
            if (childL_loc < this.size()){
                //grab the child node
                var childL = this.myList[childL_loc];
                if (childL.priority > element.priority){
                    
                    swap = childL;
                    swap_index = childL_loc;
                }
            }
            
            //test for right child in heap
            if (childR_loc < this.size()){
                //grab the child node
                var childR = this.myList[childR_loc];
                //test for childL and childR vs element priority
                if (childR.priority > element.priority){
                    if (swap != null){
                        if (childR.priority > swap.priority){
                            swap = childR;
                            swap_index = childR_loc;
                        }
                    }
                    
                    if (swap == null){
                        swap = childR;
                        swap_index = childR_loc;
                    }
                }
                
            }
            
            //if no swap then break
            if (swap == null)
                return;            
            
            //swap old element with new child element
            this.myList[location] = swap;
            this.myList[swap_index] = element;
            
            //update store elements index
            this.store[swap.value].nIndex = location;
            this.store[element.value].nIndex = swap_index;
            //console.log("swapped index are ", this.store[swap.value].nIndex, ",", this.store[element.value].nIndex);
            //continue sink
            location = swap_index;
        }
    },
    
    deleteNode: function(element) {
        //prints the node that is being replaced
        console.log(this.myList[element]);
    },
    
}

//***Test Section***//
mybin = new BinaryHeap();

for (var i = 0; i<=20; i++){
    var randomNum = Math.floor(Math.random()*20);
    mybin.insert(randomNum);
}
console.log("***current heap***");
for (var i = 0; i<mybin.size(); i++){
    console.log(mybin.myList[i]);
}
console.log("***end heap***");
console.log("remove test");
for (var i=0; i<=10; i++){
    mybin.remove();
}console.log("end test");
console.log("***current heap***");
for (var i = 0; i<mybin.size(); i++){
    console.log(mybin.myList[i]);
}
console.log("***end heap***");
