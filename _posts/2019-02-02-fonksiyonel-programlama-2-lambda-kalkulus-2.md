---
layout: post
title:  "Fonksiyonel Programlama II - Lambda Kalkülüs II"
author: "Taha Ibrahim Bayram"
---

![escher-mobius-strip](/assets/images/escher-mobius-strip.jpg)
*[Escher](http://www.wikiwand.com/tr/Maurits_Cornelis_Escher)’in Mobius Şeridi.*

Lambda kalkülüse devam ederken ikinci bölüme ısınma mahiyetinde somut bir örnekle başlayalım. Hipotenüs uzunluğunu bulan bir lambda fonksiyonu yazalım:
{% highlight markdown %}
λab.√(a² + b²)
{% endhighlight %}
Fonksiyonumuz iki argüman alan bir fonksiyon. O zaman bir 3–4–5 üçgeni için ilk argümanı 3 olarak verelim:
{% highlight markdown %}
(λab.√(a² + b²)) 3
{% endhighlight %}
Beta indirgemesini yapalım:
{% highlight markdown %}
(λab.√(a² + b²)) 3
(λa.λb.√(a² + b²)) 3
[a := 3]
λb.√(3² + b²)
{% endhighlight %}
şimdi diğer bir argümanı bekliyor fonksiyonumuz, o halde 4 değerini de uygulayalım:
{% highlight markdown %}
(λb.√(3² + b²)) 4
[b := 4]
√(3² +4²)
{% endhighlight %}
İfademizi normal forma indirgediğimizi için bu adımdan sonra lamda kalkülüsün nüfuz edeceği bir adım kalmamış oluyor.

## Kombinatörler
Bünyesinde bağımsız değişken bulundurmayan lambda ifadelerine kombinatör (combinator) diyoruz.
{% highlight markdown %}
λx.x
λxy.x
λxyz.xy(xz)
{% endhighlight %}
Yukarıdaki ifadeler birer kombinatör iken;
{% highlight markdown %}
λx.y
λx.xy
{% endhighlight %}
ifadeleri kombinatör değildir. Sonsuz sayıda kombinatör olabileceği gibi, bir çok kombinatorün oldukça pratik faydaları olduğu farkedilmiştir. Bazı temel kombinatörlere göz atalım.

{% highlight markdown %}
I := λx.x
K := λx.λy.x 
S := λx.λy.λz.x z (y z)
B := λx.λy.λz.x (y z)
C := λx.λy.λz.x z y
W := λx.λy.x y y
ω := λx.x x
Ω := ω ω
Y := λg.(λx.g (x x)) (λx.g (x x))
{% endhighlight %}

**I**: Birim fonksiyon; uygulanan argümanı aynen geri verir.  
**K**: Bir x değerine uygulandığında, verilen her argüman için M değerini döndürecek bir sabit fonksiyon üretir.  
**S**: Yerine koyma (substition) operatörüdür. Üç argüman alır; ikinci argüman üçüncü argümana uygulanır, birinci argümanın üçüncü argümana uygulanır ve sonrasında ilk işlemin sonucu ikinci işlemin sonucuna uygulanır.  
**B**: Birinci ve ikinci argüman üçüncü argümana uygulanır.  
**C**: Birinci ve üçüncü argümanı değiş tokuş eder.  
**W**: İkinci argümanı kopyalar.  
**ω** : Bir fonksiyon argümanı alır ve kendine uygular.  

## Y Combinator
Ünlü Lisp programcısı ve yazar [Paul Graham](https://www.wikiwand.com/en/Paul_Graham_%28computer_programmer%29) tarafından kurulan [Hackernews](https://news.ycombinator.com/)’i de finanse eden [Y Combinator](https://www.wikiwand.com/en/Y_Combinator_%28company%29) şirketinin ilham aldığı çok önemli bir kombinatör olan Y Kombinatöründen bahsedelim.
{% highlight markdown %}
λg.(λx.g (x x)) (λx.g (x x))
{% endhighlight %}
Y Kombinatörü, lambda kalkülüsün turing-complete olduğunu da işaret eden. Bir özyineleyen (recursive) fonksiyonun, kendini çağırmadan (self reference) tanımlanabileceğinin mümkün olduğunu gösterir. Temel olarak özyineli olmayan tek bir fonksiyon alır ve bu fonksiyonu özyineli olarak geri verir.

Y Kombinatörü, diğer adıyla sabit nokta kombinatörü ([fixed-point combinator](https://www.wikiwand.com/en/Fixed-point_combinator)) aslında adında belirtilen bir iş yapıyor. Sabit nokta kavramı, bir fonksiyonun sabit fonksiyon gibi davrandığı noktalara tekabül ediyor. Örneğin f(x) = x² fonksiyonu’nun sabit noktaları 0 ve 1'dir. Yani öyle bir fonksiyon istiyoruz ki x’in değeri f(x)’e eşit olacak. Yani (λx.g (x x)) (λx.g (x x)) ifadesi g’nin sabit noktasına tekabül ediyor.
{% highlight markdown %}
X = (λx.g (x x)) (λx.g (x x))
X = g(x x) [x := λx. g(x x)]
X = g((λx. g(x x)) (λx. g(x x)))
X = g X
{% endhighlight %}
Böylece Y kombinatörünün istediğimiz sabit nokta fonksiyonu olduğunu göstermiş oluyoruz.

> Y Kombinatörü, ıraksaklık, kendini çağırma ve özyineleme gibi konular aklıma [Epimenides paradoksunu](https://www.wikiwand.com/tr/Epimenides_paradoksu) getiriyor.

![thinking-man](/assets/images/thinking-man.jpg)
*“Bu blogda yazılan herşey yalandır.”*

## Church Kodlaması
Church kodlaması ([Church Encoding](https://www.wikiwand.com/en/Church_encoding)) lambda kalkülüs ile verileri, operatörleri, mantığı ifade etmemize yarayan kodlama yöntemidir. Lambda kalkülüste sahip olduğumuz yalnızca üç şey var demiştik; değişkenler, soyutlama (yani fonksiyonlar) ve fonksiyonların uygulanması. Yani lambda kalkülüs evreninde elimizde sayılar veya *Bool mantığı* bile yok.

Örneğin Doğru (True) ve Yanlış’ı (False) lambda kalkülüs ile tasvir etmeye çalışalım:

{% highlight markdown %}
Doğru = λx.λy.x
Yanlış = λx.λy.y
{% endhighlight %}

Şimdi Doğru ve Yanlış’ın tanımını yaptık, öyleyse değili de tanımlayabiliriz. Çünkü artık bir şeyin neyin değili olduğuna dair bir referansımız var:
{% highlight markdown %}
Değil = λx.x Yanlış Doğru
{% endhighlight %}

İlk bakışta biraz garip gözüküyor kabul ediyorum. O zaman bir örnek değer ile beta indirgemesini yapalım ve açıklığa kavuşturalım. Doğrunun değilini bulmak için doğruyu Değil fonksiyonuna bir argüman olarak verelim:

{% highlight markdown %}
Değil Doğru
(λ.x.x Yanlış Doğru) Doğru
Doğru Yanlış Doğru
{% endhighlight %}

Evet baya garip bir görüntü oluştu yine. Fakat bu ifadede yer alan herşeyin bir tanımını yaptık az önce, o zaman o tanımı açalım ve bakalım ne olacak:
{% highlight markdown %}
(λx.λy.x) Yanlış Doğru
Yanlış
{% endhighlight %}

Evet bir aydınlanma yaşadık az önce :)

Önceden de belirttiğimiz gibi şunu unutmamak elzemdir; teorik olarak lambda kalkülüs ile hesaplanmış, hesaplanan, ve hesaplanabilecek herşeyi gösterebiliriz. Ne kadar verimli olup olmayacağı çok da önemli değil, buradaki önemli husus **herşeyin λ-Kalkülüs ile hesaplanabilir olması.**

<hr>
## Sonuç :
Fonksiyonel Programlama, matematiksel fonksiyonlar üzerinde modellenmiş fonksiyonlara dayalı bir bilgisayar programlama paradigmasıdır. Aslında *ifadelerin (expression)* birleşiminden başka birşey olmayan; *yan etkiler (side effects)*, *değişebilir veri(mutable data)* ve *değişken durum(changing state)* gibi kavramlardan arınmış programlardır.

Lambda kalkülüs’ün ve dolayısıyla fonksiyonel programlama dillerinin diğer diller üzerinde muazzam bir etkisi vardır: *İsimsiz fonksiyonlar (anonymous functions), closure, çöp toplayıcılar (garbage collection), kapsamlar (scope), meta-programlama, tip sistemleri, tip çıkarımı (type inference)* ve diğer bir çok temel ve yaygın kavram. Bunların yanı sıra bir çok programlama dili lambda fonksiyonları yazmamızaz imkanı verir.

<hr>
![john-mccharty.jpg](/assets/images/john-mccharty.jpg)
*John McCharty*

## LISP
MIT labaratuvarlarında profesörlük yapan McCharty, Church’ün lambda kalkülüs üzerine yaptığı çalışmalardan etkilenmesi sonucunda LISP dilini ortaya koyar.

Bir sonraki yazıda LISP ([Racket](http://racket-lang.org/)) ile fonksiyonel programlama temellerini irdelemeye devam edeceğiz.