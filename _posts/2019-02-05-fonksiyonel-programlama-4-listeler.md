---
layout: post
title:  "Fonksiyonel Programlama IV - Listeler"
author: "Taha Ibrahim Bayram"
---

![](/assets/images/1yf-m5yrVnr5jI1xFMz_7Og.jpeg)
*Yine Escher'den.*

Lisp, ismini listelerden almış bir dil (List Processing: liste işleme). Dolayısıyla zaten isminden de anlaşılacağı üzere listelerle fazlasıyla ilgilenen bir dil. Önceki bölümde şöyle birşey demiştik:

> “…Lisp’in en önemli özelliği; süreçleri (process) betimleme yolu, yani yordamların (procedure) veri (data) olarak gösterilebilmesi ve işlenebilmesidir. Yani Lisp yordamlar -kod- ile veri arasındaki ilişkiyi farklı bir boyuta getiriyor, onları denk görüyor.”

Şimdi bunu biraz daha açıklığa kavuşturalım. Elimize en basitinden bir kod alalım:
{% highlight racket %}
(define x 5)
{% endhighlight %}
Yukarıdaki ifade, x değerine 5 değerini bağlayan bir lisp kodu. Şimdi gelin beraber Lisp’in zerafetine şahit olalım, bu kod parçasının başına sadece bir tırnak(‘) işareti koyalım:
{% highlight racket %}
‘(define x 5)
{% endhighlight %}
Evet! Artık elimizde bir liste var!

![](/assets/images/1I3C14OzznDebbzRQgY6EWA.gif)

Bu aklımızın bir köşesinde dursun şimdilik, listenin ne olduğunu irdeleyip tekrar bu noktaya döndüğümüzde aklınızdaki bulanıklık da gitmiş olacak.

## Cons Cells
Eğer *tek yönlü bağlı liste* denen veri yapısından haberdar iseniz zaten lispteki listeleri biliyorsunuz demektir. Racket’ta listeleri anlamak için önce *“cons cells”* dediğimiz yapıları anlamamız elzemdir. Çünkü listeler aslında “cons cell” yapılarından oluşan kompozit bir yapıdır. “cons”, İngilizce’deki construct (kurmak, inşa etmek) sözcüğünün kısaltılmış halidir. “cons” fonksiyonu iki değeri veya adresi tutan bir bellek nesnesi oluşturur. Hemen bir örnekle gösterelim: (Antiparantez; repl’a girdiğimiz kod satırı “>” ile başlayan satır, sonraki satır ise repl’ın verdiği yanıt.)

![](/assets/images/03shY369f8kdEJk3L.png)
{% highlight racket %}
> (cons "hello" "world")
'("hello" . "world")
{% endhighlight %}
Ortadaki nokta bunun bir “cons çifti” olduğunu gösterir. İki tarafta bir değer tutar. Sağ tarafta bir adres (başka bir cons) tuttuğumuzda ortadaki noktanın olmadığını göreceğiz.
Cons cells yapısında kullandığımız 3 temel fonksiyon vardır. Bunlardan ilki *cons*, diğer ikisi ise *car* ve *cdr*. Öncelikle örneğin daha anlaşılır bir hale gelmesi için bir cons oluşturup isimlendirelim:

{% highlight racket %}
> (define ad-soyad (cons "John" "McCarthy"))
{% endhighlight %}

Car fonksiyonu ilk değeri(veya adresi), cdr fonksiyonu ikinci değeri(veya adresi) verecektir:

{% highlight racket %}
> (car ad-soyad)
"John"
> (cdr ad-soyad)
"McCarthy"
{% endhighlight %}

![](/assets/images/05rEX33qd_ysqz_qv.png)

Şimdi yukardaki görselde sağ taraftaki iki elemanlı listeyi yazalım:

{% highlight racket %}
> (define liste-adı (cons ("a" (cons "b" '())))
'("a" "b")
{% endhighlight %}

Cons cell’leri birleştirerek oluşturduğumuz listelerde

{% highlight racket %}
(cons değer <sonraki cons>)
{% endhighlight %}

yapısını izliyoruz. Eğer en son değer girildiyse cons’un işaret edeceği bir başka cons olmadığı için sağdaki hücreye boş listeyi ifade eden *empty, ‘(), (list)* ifadelerinden birini yazıyoruz. Örneğin tek elemanlı bir liste:

{% highlight racket %}
(cons 1 empty)
(cons 1 '())
(cons 1 (list))
{% endhighlight %}

biçimlerinde gösterilebilir.

![](/assets/images/0jL5YHUZSHKV_rGFP.png)

Cons cells yapısını şu analojiyle anlatmayı deneyelim. Liseden arkadaşlarınızla buluşacaksınız ver herkes bir kişiyi çağıracak siz Ali’yi çağırdınız, Ali Ahmet’i çağırdı, Ahmet Ayşe’yi, Ayşe Zeynep’i, Zeynep Fatih’i …. en son Efe kimseyi çağırmadı ve x sayıda arkadaş bir biriniz vasıtasıyla bir araya geldiniz.

## Listeler
Racket’ta bir listeyi üç farklı şekilde oluşturabiliriz:

{% highlight racket %}
> '(1 2)
'(1 2)

> (list 1 2)
'(1 2)

> (cons 1 (cons 2 '()))
'(1 2)
{% endhighlight %}

Yukarıda öğrendiklerimizi bir örnekle pekiştirelim:

{% highlight racket %}
> (define sebzeler (cons 'salatalık (cons 'domates (cons 'kıvırcık empty))))

> (define meyveler (cons 'erik (cons 'karpuz empty)))

> (define yiyecekler (cons sebzeler (cons meyveler empty)))

> yiyecekler
'((salatalık domates kıvırcık) (erik karpuz))

> (car yiyecekler)
'(salatalık domates kıvırcık)

> (cdr yiyecekler)
'(erik karpuz)

> (car (cdr (car yiyecekler)))
'domates
{% endhighlight %}

Listelerde şu 3 temel fonksiyon üzerine kuruludur: *list, first ve rest*. list fonksiyonu yukarıda da gördüğümüz liste oluşturmaya yarayan fonksiyondur. first, listenin ilk elemanını verir ver her zaman bir değerdir. Ve rest fonksiyonu ise listenin arda kalan kısmını verir ve her zaman bir liste geri verecektir. first ve rest car ve cdr ile nerdeyse aynıdır ancak first ve rest’i tek bir cons cell’de kullanamazsınız. örneğin *“(cons 1 2)”* çünkü rest fonksiyonu için sağ taraftaki değer her daim bir liste olmalıydı demiştik.

****

Şimdi en başta bahsettiğimiz bir kod parçasını listeye nasıl dönüştürdüğümüze dönelim. quote fonksiyonu bizim için bir kod parçasının başına bir tırnak ekliyor. Ve ta taa! Artık kodunuz bir veri (liste) oldu. Örnekle gösterecek olursak:

{% highlight racket %}
> (quote (define x 5))
'(define x 5)
{% endhighlight %}

Hiç değişken ismini ekrana yazdırma istemiş miydiniz?

{% highlight racket %}
> (print (first (rest (quote (define x 5)))))
'x
{% endhighlight %}

## Liste Fonksiyonları
Bir listenin n’inci elemanına nasıl ulaşırız? Veya bir dizinin uzunluğunu nasıl öğreniriz? Bunlar gibi basit ve çok daha fazlası fonksiyon Racket’ın kütüphanelerinde kullanıma hazırdır. Ancak listeleri, özyinelemeyi, listelerle nasıl çalışılacağını yani Lisp’i iyi kavramak istiyorsak bu fonksiyonların nasıl çalıştığını anlamak faydalı olacaktır.

### list-ref
Örneğin bir listenin n’inci elemanına erişmek için Racket’taki list-ref fonksiyonunu kullanabiliriz:

{% highlight racket %}
> (list-ref (list 1 2 3 4 5 6 7 8 9 10) 0)
1

> (list-ref (list 1 2 3 4 5 6 7 8 9 10) 5)
6
{% endhighlight %}

Peki şimdi bu fonksiyonu kendimiz yazmayı deneyelim. Fonksiyonumuzu formalize delim.

- n= 0 ise ilk eleman (first); diğer durumlarda listenin arda kalanının n-1’incisinin ilk elemanı.

{% highlight racket %}
(define (eleman-getir liste indis)
  (if (= indis 0)
      (first liste)
      (eleman-getir (rest liste)
                (- indis 1))))
{% endhighlight %}

Fonksiyonumuzun kullanımı ise aynı şekilde olacak:

{% highlight racket %}
> (eleman-getir (list 1 2 3 4 5) 3)
4
{% endhighlight %}

Nasıl bu yordamın nasıl çalıştığını daha iyi anlamamız hasebiyle fonksiyonun girdileri nasıl işlediğini de inceleyebiliriz.


>liste — > (1 2 3 4 5)  
indis — >3  
liste → (2 3 4 5)  
indis →2  
liste → (3 4 5)  
indis →1  
liste → (4 5)  
indis →0

Dördüncü adımda indis değeri 0'a eşit olduğu için listenin car’ı dönüş değeri olarak alınır ve fonksiyon sonlanır.

### length
Bir listenin uzunluğunu hesaplayan fonksiyon Racket’ta length fonksiyonudur. Kullanımı şu şekilde:

{% highlight racket %}
> (length '(1 2 3 4 5))
5
{% endhighlight %}

Bu fonksiyonu kendimiz yazalım:

{% highlight racket %}
(define (uzunluk liste)
  (if (empty? liste)
      0
      (+ 1 (uzunluk (cdr liste)))))
{% endhighlight %}

Bu fonksiyonun yorumlanma süreci şu şekilde olacak:

Fonksiyon ilk çağırıldığında if koşulunda liste boş ise uzunluk 0 olarak belirlenecek ve fonksiyon sonlanacaktır. Aksi takdirde (else) şu şekilde özyineleme süreci ilerleyecektir:

{% highlight markdown %}
(+ 1 (uzunluk '(2 3 4 5)))
(+ 1 (+ 1 (uzunluk '(3 4 5))))
(+ 1 (+ 1 (+ 1 (uzunluk '(4 5)))))
(+ 1 (+ 1 (+ 1 (+ 1 (uzunluk '(5))))))
(+ 1 (+ 1 (+ 1 (+ 1 (+ 1 (uzunluk '()))))))
(+ 1 (+ 1 (+ 1 (+ 1 (+ 1 0)))))
(+ 1 (+ 1 (+ 1 (+ 1 1))))
(+ 1 (+ 1 (+ 1 2)))
(+ 1 (+ 1 3))
(+ 1 4)
5
{% endhighlight %}

Yani tabiri câizse liste kendini yiyerek boş listeye ulaşıyor. Ve boş listeye ulaştığında boş listeyle çağırılan fonksiyon bu sefer kendini çağırmak yerine 0 değeri döndürüyor ve fonksiyon yinelemeden-döngüden kurtuluyor.

****

Bir sonraki bölümde yine listelerle uğraşıyor olacağız.