<template>
     <li>
    <div 
      :class="{bold: isFolder}"
      
      @dblclick="$emit('modifier', item)">
    <span v-if="isFolder" @click="toggle"> <i :class="iconClasses"></i></span>

     <span style="font-size: 1.5em;" :title="item.libelle"> <code > {{item.code}}</code>  {{ item.libelle |subStr(100) }} </span>
     <span style="cursor: pointer;"  class="add" @click="$emit('ajouterElementEnfant', item)"><i class="icon-plus-sign"></i></span>
    
     <span style="cursor: pointer;" class="add" @click="$emit('supprimer', item)"><i class="icon-trash"></i></span>

    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <Tree
        class="item"
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        @ajouterElementEnfant="$emit('ajouterElementEnfant', $event)"
        @supprimer="$emit('supprimer', $event)"

        @modifier="$emit('modifier', $event)"
      ></Tree>
    </ul>
  </li>
</template>

<script>

export default {
    name: 'Tree',
     props: {
    item: Object
  },
  data: function () {
    return {
      isOpen: false,
      isOver: false,
    }
  },
  computed: {

    isFolder: function () {
      return this.item.children &&
        this.item.children.length
    },
    iconClasses() {
      return {
        'icon-chevron-right': !this.isOpen && this.item.children.length,
        'icon-chevron-down': this.isOpen && this.item.children.length
      }
    },

   
  },

  filters: {
  
  	subStr: function(string, nbr) {
      if (!string) return ''
      if(string.length <= nbr) return string 
    	return string.substring(0,nbr) + '...';

      
        }
  
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
         // console.log(this.$route.name)
      }
    },
  
  }
}
</script>

<style>
.add:hover{

}
</style>
