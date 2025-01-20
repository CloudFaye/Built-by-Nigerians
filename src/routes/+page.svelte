<script class="">
    import MagicCard from "../lib/components/MagicCard.svelte";
   
    let src = MagicCard;
	const designer = [
        { name: "Designer name",
         avatar: "/works.svg"}   
          ];

          let data = designer;




</script>


<section class='w-[1024px] h-fit mx-auto p-10 justify-center items-center flex-col flex'>
    <h1 class='h1 mb-5 '>
        Nigerians who Design
    </h1>
    <p class='text-center'>Your Favourite Designers, their Pixels,  their Philosopy.</p>
    <a class='btn variant-filled my-5' href="/directory">See directory</a>
    <!--body content-->
    <div class="flex flex-cols min-h-fit mt-10 gap-4">
        {#each designer as data }
                {#if (designer.length > 0)}
                <div  class="w-full h-fit">
                    <a href="/directory">
                        <div class="  h-fit">
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                            <MagicCard
                            class="cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300"
                            gradientColor="#ffffff"
                            gradientSize={300} >
                                {data.name}
                            </MagicCard>
                        </div>
                    </a>
                    
                </div>
                {/if}
              {/each}
       
    </div>
</section>



   

  
  
  
  
<style>
    
  </style>

