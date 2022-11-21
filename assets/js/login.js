$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.link_reg').show()

    })
    $('#link_login').on('click',function(){
       
        $('.login-box').show()
        $('.link_reg').hide()
    })
    const form = layui.form
    const layer = layui.layer
    form.verify({
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    repwd:function(value){
        var pwd = $('.link_reg [name=password]').val()
        if(pwd !== value){
            return '两次密码不一致'
        }
    }
    })
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username:$('.link_reg [name=username]').val(),
            password:$('.link_reg [name=password]').val(),}
        $.post('/api/regUser',data,
            function(res){
                if(res.status !== 0){
                    // return console.log(res.message)
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            }
        )
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token',res.token)
                location.href('/index.html')
            }
        })
    })
})
