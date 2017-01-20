$(function(){
	$('.del').click(function(e){
		var target = $(e.target)
		//console.log(target,target.data);
		var id=target.data('id')
		var tr=$('.item-id-'+id)
		
		$.ajax({
			type:'DELETE',
			url:'/admin/list?id='+id
		})
		.done(function(results){
			console.log(results.success);
			if(results.success===1){
				if(tr.length>0){
					tr.remove()
				}
			}
		})
	})
})