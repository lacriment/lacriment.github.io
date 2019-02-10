---
layout: post
title:  "Fonksiyonel Programlama III - Lisp'e Giriş"
author: "Taha Ibrahim Bayram"
---

![](/assets/images/0K1LsJ9bGn3V54uHk.jpg)

1950’lerin sonlarında MIT’de ilk yapay zeka çalışmalarını yürüten bilgisayar
bilimcilerinden biri olan John McCarthy eski çalışmaları incelerken Church’ün
[lambda
kalkülüs](https://blog.lacriment.com/2019-02-03/fonksiyonel-programlama-1)
çalışmlarını keşfeder ve derin bir ilgi duyar. Sonraları bu ilgisi onu
bilgisayar programlamanın makine kodu yazmaktan daha zekice bir yolu olabileceği
fikrine götürür.

1960 yılında belirli mantıksal ifadeleri muhakeme etmeye yönelik bir formalizm
olarak [“Sembolik İfadelerin Özyineli Fonksiyonları ve Makine ile
Hesaplanması”](http://www-formal.stanford.edu/jmc/recursive/recursive.html)
adındaki makalesinde tasarlamış olduğu Lisp dilini ortaya koydu. İlk Lisp
yorumlayıcısı MIT yapay zeka laboratuvarlarında geliştirilmiş,“LISt Processing”
(Liste İşleme)’in bir kısaltması olarak LISP adını almıştır. Bir Lisp
yorumlayıcısı, Lisp dilinde ifade edilmiş süreçleri yürüten bir makinedir.

![](/assets/images/078E1-pdkBasuOgNM.jpg)
*Her konuda olduğu gibi bu konuda da radikal bir duruş sergileyen Stallman şöyle
diyor: “En güçlü programlama dili Lisp’dir. Lisp (ya da bir varyantı olan
Scheme) bilmiyorsanız güçlü bir dilin ne demek olduğunu anlayamazsınız. Lisp
öğendikten sonra diğer dillerde neyin eksik olduğunu hissedeceksiniz.”*

**Lisp popüler bir değil ise neden onu kullanalım ve üzerine kafa yoralım?**
<br> Popülerlik konusunda Paul Graham’ın [şu
yazısına](http://www.paulgraham.com/popular.html) atıf yapalım ve Lisp’in neden
önemli olduğuna bakalım.

> “Lisp öğrenmek bir çok sebepten dolayı önemlidir; tam olarak anladığınızda içinize işleyecek o derin aydınlanmayı tecrübe edeceksiniz. Bu tecrübe, günlük
yaşamda Lisp’i doğrudan kullanmasanız dahi sizi hayatınızın kalanında daha iyi
bir programcı yapacaktır.”

Lisp ile ilgi büyük programcılar tarafında söylenmiş daha fazla söze [şurdan
ulaşabilirsiniz.](http://www.paulgraham.com/quotes.html)

![](/assets/images/08lMwMjqnQD7ceIch.png)
*Fonksiyonel Programlama, Tanımlamalı Programlama (Declerative)
paradigmalarından birisidir. Diğer ana paradigma ise Emirli Programlamadır
(Imperative).*

Peki Lisp’i bu kadar harika kılan ne? Lisp üst düzeyde ifade imkanı sağlayan
-anlatımsal- bir dil. Lisp ile çok çetrefilli problemleri ele alıp bunlara dair
çözümleri gayet temiz ve maksada uygun biçimde ifade edebiliriz. Eğer Lisp’te
bize lazım olan araçlar yok ise o zaman da Lisp’i değiştiririz! İşte bu tam
olarak Lisp’in en önemli özelliği; süreçleri (process) betimleme yolu, yani
yordamların (procedure) veri (data) olarak gösterilebilmesi ve işlenebilmesidir.
Yani Lisp yordamlar -kod- ile veri arasındaki ilişkiyi farklı bir boyuta
getiriyor, onları denk görüyor. Bu sebepten dolayı Lisp
[homoikonik](https://www.wikiwand.com/en/Homoiconicity) bir dil olarak
adlandırılır.

İşi daha fazla yokuşa sürüp karışıklaştırmak istemiyorum ama; Lisp’in de farklı
paradigmalara sahip farklı sürümleri var. Aslında sürüm de denemez, farklı
lispler diyelim. Lisp camiasında büyük harfle başlayan Lisp ile genelde
CommonLisp kastedilir (Lisp-2 türü). Bizim örneklerde kullanacağımız Racket dili
ise MIT’nin eğitim amaçlı geliştirdiği Scheme (Lisp-1 türü) adındaki lisp
ailesindendir. Bugünlerde gittikçe popüler hale gelen ve gelişmekte olan taze
bir dil [Clojure](http://clojure.org/) ise diğer lisplere göre bazı farklı
yaklaşımlar ortaya koyuyor (Tembellik, Değişmezlik vb.).

![Racket](/assets/images/1eo8w3gIOivC7uEX64-m1gA.png)

## Racket

Racket oldukça sade bir Lisp sentaksına sahip. — Yani burda yazacağımız Racket
kodlarını belki hiç değiştirmeden belki de çok küçük değişiklikler yaparak diğer
lisplerde çalıştırabilirsiniz. — Eğitim için tasarlanmış bir dil olmasına rağmen
bugün birbirinden farklı bir çok alanda kullanımı var. Oldukça da olgun bir dil
(23 Yıl). Racket kendisini “Programlama-Dili Programlama Dili” olarak
tanımlıyor. Yani web programlama dili web uygulaması geliştirmek için ise,
programlama-dili programlama dili de programlama dili geliştirmek için gibi
düşünebiliriz. Racket ile tasarladığınız bir dili gerçeklemek oldukça kolay ve
yüzlerce başarılı-deneysel-ilginç dil de var. Örneğin oyun sektörünün üstadı
John Carmack bir canlı oturumda sanal gerçeklik ortamı Oculus için [şöyle bir
çalışma yapıyor](https://www.youtube.com/watch?v=ydyztGZnbNs) ve Racket
kullanıyor. Dijital kitap yayınlamayı farklı bir boyuta taşıyan
[Pollen](http://docs.racket-lang.org/pollen/) da benim nazarımda ilginç bir
örnek. Kayda değer akademik çalışmalar ise saymakla bitmez.

![](/assets/images/0hiSGVtthjDi5Qdmr.jpg)
*“Konuşmak kolay, bana kodu göster.” diye serzeniş eden Linus Torvalds. Ne kadar
haklıdır bilemedim.*

Çok gevezelik ettik. Artık lisp aleminin derinliklerine bir adım atıp bu bölümü
sonlandıralım.

MIT’nin [SICP](https://mitpress.mit.edu/sicp/) adlı kitabında bir programlama
dilinin üç temel özelliği olduğundan söz edilir:

## 1. İlkel İfadeler: en basit varlık düzeyini ifade edebilme yeteneği.

Lisp yorumlayıcısına basit bir sayı değeri verirsek,

{% highlight racket %}
512
{% endhighlight %}

bize sonuç olarak

{% highlight racket %}
512
{% endhighlight %}

değerini verecektir.

En basitinden bir aritmetik işlemi ifade edelim,

{% highlight racket %}
(+ 10 30)
{% endhighlight %}

ifadesine yorumlayıcı tahmin edeceğiniz gibi

{% highlight racket %}
40
{% endhighlight %}

yanıtını verecektir.

(+ 10 30) ifadesinde gördüğümüz gibi lisp prefix -önek- bir dildir. Yani
fonksiyonları (burada toplama [+] fonksiyonu) uygulamak istediğimiz değerlerden
öne koyuyoruz. Temel aritmetik işlemler ve sayılar ilkel ifadelere örnek teşkil
edebilir.

## 2. Birleştirme (Kombinasyon): basit unsurları birleştirip daha karmaşık yapılar oluşturabilmek.

a² + b² ifadesini Racket kodu ile gösterecek olursak:

{% highlight racket %}
(+ (* 3 3) (* 4 4))
{% endhighlight %}

yorumlayıcı bu ifadeyi şöyle işleyecektir:


Farklı iki ilkel ifadeyi çarpma işlemiyle birleştirdik. Bu noktada belki prefix
sentaksın faydalarından bahsedebiliriz. Örneğin prefix sözdizimi ile 5 tane
sayıyı toplamak için 1+2+3+4+5 yazmak yerine, hepsini kapsayan bir ‘+ ‘
fonksiyonuyla daha temiz bir gösterim yapabiliriz:

{% highlight racket %}
(+ 1 2 3 4 5)
{% endhighlight %}

Yine bu değerleri de sonsuz sayıda iç içe geçirebilir, birleştirebiliriz.

{% highlight racket %}
(* (+ 1 2 3 4 5) (+ 6 7 8) (+ 9 10) (/ 5 2))
{% endhighlight %}

Sözdizimsel olarak tek kural fonksiyon adı (burada ‘+’) ve argümanlar arasında
bir boşluk bırakmak. Birden fazla boşluk bırakırsak bunlar yorumlayıcı tarafıdan
gözardı edilecektir. Bu da bizim daha karmaşık kodları daha okunabilir yazmamıza
olanak sağlayacaktır. Örneğin yukarıdaki ifadeyi şu şekilde daha okunaklı
gösterebiliriz:

{% highlight racket %}
(* 
    (+ 1 2 3 4 5)
    (+ 6 7 8)
    (+ 9 10)
    (/ 5 2)
)
{% endhighlight %}

Lisp’in ilk başta girift ve zorlu gözüken parentez sözdizimine alıştıkça zamanla
ne kadar sade, anlaşılır ve yararlı olduğunu farkedeceksiniz.

## 3. Soyutlama: bileşik yapıları isimlendirip bir bütünlük olarak işleyebilmek.

Lambda Kalkülüs’ten hatırladığımız bir kavram; soyutlama, yani fonksiyonlar.

“define” Racket’ın bize sunduğu en ilkel soyutlama aracı. Lisp’te bir
fonksiyonun yapısı şu şekilde:

{% highlight racket %}
(define (<fonksiyon_adı> <arg1> <arg2> <arg3> ... )
... ) ;; yordam, fonksiyonun gövdesi
{% endhighlight %}

Değişken tanımlamak da benzer bir şekilde:

{% highlight racket %}
(define <degisken_adi> <deger>)
(define pi-sayisi 3.14)
(define zurna "zurna")
{% endhighlight %}

Kare alma fonksiyonunun Racket’ta gösterimine bakalım,

{% highlight racket %}
(define (kare a) 
    (* a a))
{% endhighlight %}

“Define”dan sonra parantezin içine yazılan ilk değer fonksiyon adı ikinci ve
sonraki değerler argümanlardır. Artık “kare” fonksiyonuna bir değer (argüman)
vererek kullanabiliriz:

{% highlight racket %}
(kare 4)
(kare 5)
{% endhighlight %}

yorumlayıcı

{% highlight racket %}
16
25
{% endhighlight %}

olarak yanıt verecektir.

Bir hipotenüs fonksiyonu yazalım:

{% highlight racket %}
(define (hipotenüs a b)
    (sqrt                  ;; -> sqrt racket'ın sağladı bir fonksiyon
    (kare a)             ;; -> lispte yorum satırı 
    (kare b)))           ;;    noktalı virgülle başlar
{% endhighlight %}

İki argüman alan fonksiyon bize değer olarak √(a² + b²) fonksiyonunun sonucunu
hesaplar. Lisp’de fonksiyonların dönüş değeri “return” gibi bir komut ile
gösterilmez. Bunun yerine lisp sözdiziminde dönüş değeri, fonksiyon gövdesindeki
en son ifadedir.

## Koşullar

If koşulunun sözdizimi şöyle:

{% highlight racket %}
(if (koşul) 
    <doğru ise>   ;; diğer dillerdeki if bloğu
    <yanlış ise>) ;; burayı da else bloğu gibi düşünebiliriz
{% endhighlight %}

bir sayıyı negatif ise pozitif yapan bir fonksiyon yazalım:

{% highlight racket %}
(define (pozitif-yap x)
    (if (< x 0)
    (- x)
    x))  
{% endhighlight %}

Kullanımı ise:

{% highlight racket %}
(pozitif-yap -5)
(pozitif-yap 135)
(pozitif-yap 0)
{% endhighlight %}

şeklinde olacak, yorumlayıcından bu ifadelere karşılık

{% highlight racket %}
5
135
0
{% endhighlight %}

yanıtlarını alacağız.

Bu bölümü faktöriyel hesaplayan fonksiyon ile sonlandıralım:

> f(0) = 1<br> f (n) = n (n-1)!

Racket ile kodyacak olursak:

{% highlight racket %}
(define (faktöriyel n)
    (if (= n 0)
        1
        (* n (faktöriyel (- n 1)))))
{% endhighlight %}

5 faktöriyeli

{% highlight racket %}
(faktöriyel 5)
{% endhighlight %}

şeklinde kullanarak bulabiliriz. Yorumlayıcı bu ifadeyi şu şekilde ele
alacaktır:

{% highlight racket %}
(faktöriyel 5)
(* 5 (faktöriyel 4))
(* 5 (* 4 (faktöriyel 3)))
(* 5 (* 4 (* 3 (faktöriyel 2))))
(* 5 (* 4 (* 3 (* 2 (faktöriyel 1)))))
(* 5 (* 4 (* 3 (* 2 1))))
(* 5 (* 4 (* 3 2)))
(* 5 (* 4 6))
(* 5 24)
120
{% endhighlight %}

*****

Bir sonraki bölüm Lisp’in temel yapı taşı listeler ve liste fonksiyonlarıyla ilgili olacak.