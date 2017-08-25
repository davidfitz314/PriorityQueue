# PriorityQueue
JavaScript Max Priority Queue

A priority queue for integers.
All duplicate integers increment the initial integer priority by 1.

Built using a heap data structure with a hash look up table to maintain an overall runtime of O(log n).

User Functions:

    Insert(element);

      //Inserts an element into the priority queue.
      
    remove();

      //Removes the highest priority element from the queue.

Non User Functions:

    Bubble(element);

      //Moves a high priority element towards the top of the binary heap.

    sink(element);

      //Moves a low priority element towards the bottom of the binary heap.

    find_update(element, index);

      //Recursively loops through the binary heaps branches to find and update an elments priority.

    deleteNode(element);

      //Prints the element being deleted by remove().

    size();

      //Returns the size of the binary heap.

    isEmptyBH();

      //Tests if binary heap array is empty.

    BinaryHeap();

      //Initializes the array for the binary heap and initializes the object for the hash table.
