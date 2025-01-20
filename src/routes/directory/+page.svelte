<script lang="ts">
	import MagicCard from "$lib/components/MagicCard.svelte";

	

    let data;
    
</script>




<div class="grid grid-row gap-6 w-[1024px] mx-auto px-[100px] justify-normal">
    <div class="flex  flex-row gap-10 rounded-3xl items-center justify-center p-10 w-full">
        <div class="image w-[200px] h-[200px] bg-slate-800 rounded-[31px] border border-solid border-white "></div>
        <div class=' w-[50%]'>
            <h1 class='h1 mb-5'>Faye seun</h1>
            <p>Every pixel drawn is a delight.......
                some other quotes and design stuffs from me,, cant seem to find a concise sentence smh</p>
        </div>
    </div>

    <div class="px-[100px]">
        <h1 class='h3 mb-4' >Pixels</h1>
        <div class="flex h-full flex-row gap-5">
            
        <MagicCard class="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
        gradientColor="#ff009ff"
        gradientSize={300} >
            works
        </MagicCard>
        <MagicCard class="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
        gradientColor="#ff009ff"
        gradientSize={300} >
            works
        </MagicCard>
        <MagicCard class="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
        gradientColor="#ff009ff"
        gradientSize={300} >
            works
        </MagicCard>
        <MagicCard class="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
        gradientColor="#ff009ff"
        gradientSize={300} >
            works
        </MagicCard>
        
            
        </div>
    </div>

   
</div>

<style>
  
</style>