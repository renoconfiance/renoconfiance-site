import React, { useState, useEffect } from "https://esm.sh/react@18.3.1";
import ReactDOM from "https://esm.sh/react-dom@18.3.1/client";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  Stamp,
  HardHat,
  ShieldCheck,
  Hammer,
  ClipboardCheck,
  Building2,
  MapPin,
  Star,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Ruler,
  FileCheck2,
  Search,
  PenTool,
  Camera,
  Coins,
  LayoutDashboard,
  ClipboardList,
  UserCircle,
  LogOut,
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  Inbox,
  Plus,
  Menu,
  X
} from "https://esm.sh/lucide-react@0.383.0?deps=react@18.3.1";
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgnawgk";
const STRIPE_LINKS = {
  D\u00E9part: "https://buy.stripe.com/14A9AV2yFckz0Kcb2KeEo03",
  Pro: "https://buy.stripe.com/28E5kF8X3esHeB20o6eEo04",
  Expert: "https://buy.stripe.com/4gMdRb4GN3O33Wo0o6eEo05"
};
const SUPABASE_URL = "https://oyvkvdmasrkvupgfnfgu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95dmt2ZG1hc3JrdnVwZ2ZuZmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTMyOTcsImV4cCI6MjEwMDUyOTI5N30.LueamYkzVUpW0CjDIYt7Qltvw0jjbcmYWR91U7C-YW4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_EMAIL = "mancheronkevin@gmail.com";
const CALENDLY_URL = "https://calendly.com/mancheronkevin/rencontre-exploratoire";
const LOGO_ICON = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCADoAUADASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIBgkDBAUCAf/EAGUQAAECBQEFAgYICxMICQUAAAECAwAEBQYRIQcIEjFBE1EUIjJhcYEVQlJikaGxtBYzU2NydJSys9HSFxgjJCU3Q1VkZXN1gpKTosHT4TU4RFRWlaPwJyg0RUZHV3bDNoOF4vH/xAAcAQEAAgIDAQAAAAAAAAAAAAAABQYEBwECAwj/xABCEQABAwICBggDAwoGAwAAAAABAAIDBBEFIQYSMUFRcQcTImGBkcHRUrHwFDKhFRYjJTRCcoKSsiQzQ1NU4TViov/aAAwDAQACEQMRAD8Av4IQh1giQhCCJ1hCEETpCHSEESEIQRIeqEIIvyP2EIIkOkIQRMwhCCJGGX/tVsTZlKSj95V5qQM26G2WQlTji9cFfAkE8CeZVjA9OBEa7eN5q39lrD1vW92FZu0px4MDlmRyNFPke26hsanrwjU6+rnuq4r1uiauK56q/UanMnLj7x6DklIGiUjokAARYcKwF9XaSbss/E8vdRNfijKfsMzd8lt5p1RkKvSpepUudYnJOYQHGZiXWFtuJPJSVDQiOz0jWFsW3gLs2PVNEmyVVS2nXOKZpDq8BOea2VH6Wv8Aqq6jqNilhbQ7T2l2m3cFpVRE3Lqwl1o+K9Lrxq26jmlXxHmCRrGJieEy0LrnNu4+/BZFFXx1TcsncFlMMwh1iJWckIa4h0giQhmHrgidIQhBEgYdYQRIQ6Q6wRMeaEIQRIQhBEhCEESEIQRIQhBEhCEETkYYhCCJCEIIkIQxBEhCEESEPTHj3RdVv2ZbEzcNz1WXptNlk5cffOB5kgc1KPIJGSegjlrS42AzXBIAuV6zrrTDKnnlpbbQCpS1HASBqSSeQimW33e8OZm0Nkc9rq1NXE3y7imV7/4X+b7qIv28bzlw7Unpi3Ld8Io1o8XCWM8L8+Aeb5HJPc2Dj3RUeUBAdYueE6PhlpqoZ7h7+yruIYve8cHn7LkWtx59bzzi3HHFFa1rUVKUonJJJ1JJ1JMfoEfie/pHTnapLySwjVxefGSk+SPP+KLY57I26zzYKvBrpHWbmV3gIyiw7/urZvdrdw2nU1yU0kBLqD4zUwjOS26jkpPxjmCDrGMsOMzDCXmVhaFdR8h7jHLwx6OhZK2zhcHyXm2R0brtNiFsu2KbwlqbXaeiQ8Wk3M03xTFKdXntAObjKvbo83lJ6jqZhjTvIzk5S6kxUadNPSk5LrDrMwwsoW2oclJUNQfOIu1sH3spSvqlbR2nzDMnVSQ1LVo4bZmjyCXujbh915KvennRsX0cdBeamF27xvHuPxVrw7GWzWjmydx3FWuhAYIyIRVFOp1hCEESEIQROkAMQhBEhDrmEETTEOUIQRMQhCCJD1whBE1hCEETrmEIQRIdIQ9MESEIQRIQhzgiQhCCJCHSK+7e956gbLWH7btssVm7inhLGeJiQyNFPkc1dQ2NT1KRz96enkqHiOIXK85ZWRNL3mwWfbWts1nbH7Y9kbimi9PPJPgVKlyC/NKHcD5KAeazoPOcA64tqu2G8dr10eylyTnZyjKj4FS2FHweUSfcj2yyOazqfMNIxW5bnr943PNXDc9VmKnUppXE7MPqyfMkDklI5BIwB0EeSDgxfMLwiOjAe7N/HhyVVrsRfUdluTfnzXIDgR9AjGSY67rqGmi64oJSOZMelY1h3ptdu0W7Z9OUtCMKmpl0lDEsgny3l9B3JGSroDElU1sdM3WeVhU9K+d1mrymF1St12WoFtSMxUKhNuBllqWQVrcUeiAPl5Dn54t5sm3NqPTqE7O7UmBWKnOMqT4DLvqSzIBQ5hxJy48PdeSk8grnE1bE93q1NlVFCac17IVp9ATOVmYbAdd70Nj9jb96Dk81E9J0l5BlhkIKQSIoeI4xLVO7JsFa6PD2U7dma1Z7Yt3y8Ni9SduGml6sWkpeEz3B40vk6ImUjyT0Dg8U+9OkYBT6lL1Bkrb8RweU0o6jz+ceeNvlWoUtPyjrDrDbzDqChxpxIWlaSMFKknQgjmDpFF9vm6FNU2YmLw2QSjnYoy9MW62SVt9SqVPNQ+tHX3JPkxI4PpA+A9XNmPryWFiOENmGvHkVXU6wI0748qm1kPOGVnh2EwklHjDhBIOCCD5Ks9P/AOR7GOcX+CaOdmvGbhVGWJ8LtV4ViNhG9FWbAVL2xey5mr2zohp/JcmaePe51cbHuDqPan2sXxodeo1zW/LVugVKXqNOmkdozMy6wpCx+MciDqDoY1CHWJG2S7aLu2Q18zNFe8Lpb6wZykzCz2L/AL4e4cxyWPWCNIrWMaOMqLzU+T+G4+x+u9TeG406K0c+beO8LaNCMG2Y7WLQ2rWsKtbc7iYbAE3T3yEzEoo9FpzqD0UMg9DzAzg6c+8Rr+WJ8TzHILEK3Me17Q5puCuIzUqMgzLIP2Yh4ZKdZpj+kH441O3e84naHX/HVj2TmtM/Xlx4an3Cc8avhi6s0NDmh3Xbf/X/ALVYfpIWuLeq2d//AEtvvhsn/rTH9IPxx9tvsPKIaebWQMkJUDGnxTy+qj8MWg3Hlle1m5snP6kI/DpjDxDRgUlO6frb23Wt6rJoscNTM2Lq7X7/APpXnhDSHWKkrAkOkIZgiQhDpBEhCEESEIQRIQhBE6Q6wh0giQhCCJCEIInWPlxxtllTrq0oQgFSlKOAANSSY8y5LloNoWzN3DctUlqbTZRHG9MzCsJSOg7yTyAGSToAY147ft6OvbUnpi2rXMxR7QCilTeeB+ogdXseSjubH8rPIZ9Bh8tY+zMhvKxqmqZTtu7bwUo7wW99gzNm7Ip/UZam7ia1x0KZXv7u1/m+6imC3XH3lvPLW44tRWta1FSlKJySSdSSdcxwZ6w44vlHRxUbNSMczvKqlTUyVDrv8lykx15mcalkZXkqPJI5mOF+cKV9kyO0dJ4QAM6nkPOfNFqNg26NNVl6Wu7a1JutSysOy1vOZS48OYVM41Qn60PGPtuEaHxr8TZStvfNelJQunPcou2LbvF27Zqg1WZ9T1GtJDmF1Ao8eZwdUSyT5R6Fw+KnznxY2NbP9m1s2Lastb9sUhmm09jXgRqpxeNVuLOq1nqo/ENIySkUGWkJNlhlhphhlAbaZaQEIbSBgJSkaAAcgNI9tKQkYAwIo1XWyVLtZ5yVpgp2Qts1fDTKGUcKBiOSEBGGvdDHTnJBuYQdMGO5CCKrG37dYoG0pMxcNAEvRLsA4jMhOGJ8j2swkcldA6Bn3QUOVDarJ3LY90zFqXlSpmnzsqeFbb48ZI6KBGi0HooZB6ExuUel0PIIWBEUbXNi9pbUbXNKuOn/AKM2CZOpS4CZmTUeqFHmk9UHKT6dRMYZi8tG4Z9lYFbh8dS3MZrWcFJUhK0rCkqGQQcgiP3OY9raZshvnYlcYl66z4bRZhwiUqjCT2Ex5tfpTuOaD6uIaxjbE6zNN8bKsjqDzHpjY9FiMVWwOYc+CpdVQyU7rOWQ2tdVwWXdUtcVsVR+nVGWPiPNHmOqVJOiknqk5Bi/ew3eVoG1CXYoNw+D0W6xhIlirDM6R7ZhR9t3tnUdOIctdHHH0l9bTqHWXFNuNqC0LQSClQOQQRyIPWMbE8Kgr2dvJw2H62he9BiEtI7LNvBZBei/+ki4U9BVJoD+nXHhFXnj4fmn5mYcmJh5brzqytxxZypaickk9SSScxxFzzxJNdqtDeCwXjWcXDeuVSsdYtFuMKJ2t3Pr/wBzo/DpiqpX54tNuKKztduj+J0fh0xD46+9DJy9QpLCG2qmfW5XxhpCGsavV4SHSEIIkIQgiQ0h1hBEhCHSCJCEIInWENYc4ImsIQgieuMD2qbXbO2Q2gqtXRO/o7gKZOnMkGYnFj2qE9w6qOEp6nkDgu3zeYtnY9JOUamhmtXc4jLVOSv9DlQRo5MKHkjqEDxleYeNGuG8L1ua/rumbmuyrPVKpTB8ZxzRKE50QhI0QgdEjT15MTOHYS6oIfJk35/XFR9ZXNhGq3NyzHa/tuvHbLcwnq8/4LTGFEyNIl1nsJYd5925jms69AEjSI3BxHEFYj5W6EJ4icCLlE1kTAxgsAq3I58rtZxuVzFQHWOSj0mu3Zcktbtr0yZqNRmlcDTEunK1957kpHMqOABqSIyTZpssvLa/dHsTbMmESrJBnKi+CJeUSeq1Dmo9EDxj5hkjYxsa2FWnsqt7wOhSpfn30gTtWmEjt5ojXHvEA8kJ0HM5OsRGJYu2AajM3KRosOMnafsUdbv+6vR9nqZa5rqTL1m7BhaFAcUvTj3NA+W53ukae1A5m0knT25dIJGVeeOaXlm5dsJSNe+OeKfLM+V2s83KsLGNYNVoTly5RGMzvEbFZOdelJnaFSm3mXFNOIPaZSpJII8noQYk48h6Y0/XW+fo+rpyR+qUz1+vLiZwTDIq9zxKSLW2KOxKtfStaWAG/FbLjvIbD8a7R6R/xPyYzCzr+s+/6bMVCzq7LVeVl3uwddl+LCHOEK4TkDXBB9caiC+onyjiL4birnabHrlPdWwP+A1GZi2B09HTmWNxJuNtvZY2H4nLUy9W9oAUvTu8LsXp1Sfp87tBpTMzLuqZdbUHMoWklKgfF6EERwfnkdh4Gu0akf8AE/IjWvfUyv8ANSuYLUSRV5z8OuMeMwroo/DEg3RmkLQdd34eyxX41O1xbqjLmtvFnX9Z9/02Yn7Or8rV5aWd7B5yX4sIXwhXCcga4IMZEpCVpIUMiKpbiK+PZVdRyf8ALCfm6ItfFRr6dtPUPiYbgKfppTLE2R20rFbqs6jXNb83Rq5TZeo02aRwPykwjiQ4POO8cwRgg6ggxr726br1c2avzN2WEmbqttIyt5gguTNPT148fTWh7sDI9sPbRstOoweUdCdpyH0EoGDHFJWSUr9aMpPTsmbqvC02SlRRMtgHCXPc50PnEdrj74uDt73RpeszE1dmzCVZkKrq7MUVOG2JtXMqZ6NOH3OiFHlwnnTF0ztPn36bVpZ6UnJdZadZfQW1trBwUrSdQR542Bh2Lsq2ZnNVOtw10DrjYu4V90fPEY4QrvgVxJGRYGouRS4tVuInO166f4nR+HTFTyuLUbiMwyjbNcrTjzaFu0ZPZoUoArw+knA64HOInGnXo5PrepLC22qWq/kOkOkI1yrgkIQgiYhCEESEIQROuIQhBEhCHXMESEOYjpVesUugUKarNaqEvIU+UbLr81MOBDbSBzUonkIbUXdJAGScCKebw++FK0Mzlk7J5tqbqgJZm68jC2ZU8iljo44Pd6pT04jyireK3t6ntBM3Z2zx6ZpdrHLUxPatzFSHUd7bJ9z5Sh5WB4sVcB0HTEWLD8JGUk48Pf2UTV19uxF5rtzU3NT889Ozsy9MzL6y66+8srW4snJUpR1JJ6mOLMcfFHwpwlaW20lS1EAADJJPIAdT5oseuGhQ2qXFcqnAkd56CJt2F7t1w7W5tmu1sv0e00q/7Vw4ensHVMuDpjoXD4o6cR0El7AN0Z6fclbu2sSC0tKw7K265opfUKmu4fWuZ9tjyTdZ00u2JBrtW0BQQEMSrSQnQDAAA0Skcu4dIqmO6SwUMLpHvDWN2uOwcuJ+gpugwpz3C4uTsC6Vk7P7fs22JWg27SmKbTZYYbYZHM9VKJ1Us9VHJMZm22htPCkYEdWkza56iy844lKFOo4ilPIax3Yr9PUtqomVDDcPAI5EXUs9hjcWHdkmIQhHsuqH+2NOF3uKO0OvhIOBU5rp9eXG4/GYr1UrG3QV1WaXPtbOROreWp/tZ5AX2hUSviHac+LOfPEzg9aaVzyGF17bFH4hTCdrQXAW4rW2XFdx+CL8bhilHY3c2QQPZ0c/tdqMh/M/3N/cbNvu9H97Eq7L6Tsro9uTktsmTQE01czxzPsK+l1vtuFI8YhRwrhCdO7EZmKYm6ogLDGRs2hY1FQthl1g8Fasb9X/ANK1z8OVfqxO6j7YXGOlxXuVfBGyeq2LuhuV2ddqjWzpNQcmHFTXbzyAvtSolfEO00VxZz546X0AbmyhwhGzX7vb/vYzmY04NA6p3ksd+GsLiesCxvcIUVbJbqJBA9mk4z9roi2sYJsupGyii2/Oy+yZNATT1THHNewr6XUdtwAeMQo4VwhOndGdxVq2UyzueRa/FTdOwRxtaDeyQhDmIxV7LrTMm3MIIKRkxAm3HdytnatIrniEUm5GW+GXq7Tee0A5NvpH0xHcfKT0OPFNhI+HGkOo4VDMekUr4nB7DYhdXsDxquGS053tZV17Nrsdtu7qY5JzKRxNrzxNPt5wHGl8loPxciAdI8MOApyDkRtk2lbKrV2jWu5Q7qpaZyWyVsuoPA9LLx9MaXzSr4jyII0jXLtm2E3ZserSn3krqdtvOcErV2kYSCeTbyR9Lc/qq9qeguGHYy2ezJMnfPkq9WYaY+3HsUalUduk1mqUKtytXotQmafUJVwOsTUssocaUOoI/wCTyMealwK5fAekfuYmi4EWKjAC03C2Ibve9lTL9VK2dtBdl6Xcxw3LzujcvUVdAOjbp9z5Kj5OvixaHppGk4qxy0i3W71vgzdv+CWZtWm3ZykjDUrXV5W9KjkEv9XGx7vVSevENRVcSwe15aceHt7KfosR1rMl28VfeHqjgk5yUqEgzPSE0zNSr6A40+wsLQ4kjIUlQ0II6iOeK2pdOsOsByhBEhDMIIkPNCEESEIibbht+s7YlbQeqrgqFdmUEyFFl3AHXunGs/sbYPNZ58kgnSOzGOe4NaLlcOcGi5WX7QNoto7MLMfua8aq3IybfioTjidmHMaNtI5rWe4ekkAExrL267xd27a64Zd4rpVsS7nFJ0ZpzIJHJx8j6Y5/VT7XqThW03apeO1q9nbku+ol93VMtKNZTLybefpbSOg7zzUdSTGG5iy0OHtg7b83fJQ9VVmTss2LkB74+uLzxxcQHWMx2bbMLv2r3aKFasjxpRhU3PPZTLyaD7ZxXyJGVK6DqJJ8rWAucclgtjLzYBeBRKLWrouKVoFuUyZqVSm19mzLS6OJaz18wA5lRwANSRGwDd93WaVs9Mtc10ol6vdmAtCgOOXpx7mc+U53un+SBzMgbFdglqbJ7e7CkM+F1R9AE9WJhAD0x14R9TbB5IHpJJ1jOqxcrcshUjRlgqHirmR08yfx/BGv9LNM6XCacy1DrN3AfeceAH0BvVjwzCXSOs0XP4Bd6pVmUoTRlpcJenccuaW/Orz+aMImJp+cmlvzLqnXVHVSjHGSpSiSSSdSTHWnp6VpkkZubc4GxoOpUe4DqY+TtJtLa7SKoBlyjB7LBsHue/ysFsCgw5lOA1gu4795UtW2MWnIj63/AGmPUjyLWebmLMpz7S0rbWyFJUk5BBJj14+o8CFsNpr/AAM/tCpdULTvB4n5p0hDWESqx0PL1iNOd2ugbQK8Tgn2Smtf/vLjcWenpEaZbwc4dodfTnlU5r8MuLLo5JqOk8PVQ2Ms1mN5rqF7ux8EX33DcfmN3MpPWuD5u1GvgveeNgG4KpSti9zkjT2eGPudqJHHZtalI7wsPCo9We/cqX366DtVugnBPsxOZ+6FxjhdwNMR6t/uj81i6SD/AN8zvzhyMc7aJVlR2ByWDJD23c1sD3CSDskuogD/AC0n5u3FtIqNuBEq2R3WT+3Sfm7cW5ih4mb1Tz3q1UYtAwdyQhCMBZKQ6wh0gi+VJCkkEZEeHXbcp1XpE1T6hIy87JzLZaflphsONuoPNKknQiPe56QOukEWubbxum1SzxNXbs2l5io0NPE7M0kZcmZFPMqb6utD1rSOfENRWBLoIH9nWN1k3JIfHEnRQ1GIqPvAbpshdrs1dmz5mXpdwqy5MSGjctUFcyR0adPf5KjzwfGiw0GMFto5z4+6iqvDw7tx7eCoZxQ4vPH3VKdU6FW5qj1mQmJCflXC0/LTKChxpQ6KB5f28463HFgEgIuFDGMg2KnXYLvLXRsaqKKXOB6tWk6vL1LUvx5bJ1clydEnqUHxVeY+NGyWx77tbaLZ0tc9oVZmo09/TiRotpfVtxB1QsdUnX1axpk4ozbZftZvLZFeaLgtKf4AohM3IPEql5xA9o4kfEoYUnoeYMRX4c2e72ZO+akqStdH2H5hbiIGIs2K7ebN212yZmjO+A1mXQDPUaYWC9LnlxJP7I2TyWPQQDpEpmKw9jmOLXCxU21wcLhIQh0jouUh0j5WtDSFOOKCUAZKlHAA7zFHN5PfIUlc1Yuxyoj2zU9crBzjoW5U/EXf5nuo9oYHzO1WBdJJGxi7lJm8ZvZUPZYiatGzTL1i8uEocyeOXphPV3HlOdzY9KiBodcNwXDW7ruWcuC46pM1Opzi+0fm5lXEtZ+QAcgBgAaAAR5ri3HXVOuKUtalFSlqJJUSckknmT3x8690WOlpWU4y28VDzzulPcvrOIcRj4JI5xbTd/3Rp240yl47T5R6UpSsOytCVlD00OYW/wBW2z0RopXXhHP1nqWQt1nFecUDpDYKNth27tc21+oN1Ob7aj2o25wu1NSPHmCDq3LpOildCs+KnznxY2PWJs+tXZ1ZjNHoFPYpVJlhxkZypaurjizqtZ6qOvQYGBHty8lTLat9orl25eUlkJZYl5dsISkAYShCRokeblGJVetTVWmAXD2bCT+hsJOifOe8+eNS6c9IMGDN1D2piOyzh3uPD8Tu4q1YVgxmzGTd59l3q3cq55Jk5BKmJPkeinPT3DzfDGPwjH6vcRZmBTKQ0ZuoLPAAgcQQe7HVXm5DrHzFX19fj9YZp3F8jtnAcABuHd8yr7RUIaOqhFgNvuSu/WK5KUeXy5hx9QyhkHU+c9w/5EfNtWdU7lqiKrdKVhjm1J4Kcjzj2qfNzPWPWs/Z8tEymrVs+FVFR48KPElo9/vlefkOnfErycg3LoGRlUbr0M6OI6QNq8SF37m8Oft58BE4nj7IAYKA573+jeA79p3blyyUu3KSDUuy2htttISlCAAEgdAByjseqEI26AALBU4m+ZTprCEI5XCdIr7UtzjYlUarNVB6hVRT8y8t9xQqz4BUtRUrTOmpOkWChjSPSOV8f3HEcl1cxrvvC6rj+cr2Hk/5Aqno9l3/AMqJV2Y7KLP2SW5N0azZKZlZWbmfCnUPzS5glfClOQVnIGEjSM5hHZ9RK8We4kc1w2JjTdoVfatuc7FqtXp2rzNDqa5icmHJl0iqvpBWtRUogA6DJOkdI7lWxAj/ACBVB/8Al3/yosfCOwq5h++fMrgwxnPVHksF2X7JrO2R29OUezpKZlZecmPCng/NLmCpfCEZBUdBhI0jOjrCEeLnFx1nG5XcAAWCR15yek6ez2s5MNso6cR1PoHWMer13tSa1SlN4XXxop06oR6O8/FGCzM3MTkyp+ZeW64ealnMar0o6TqTDHOpqACWUbT+6DzG09w875KcosFknAfL2W/is2nb6lmyUSEot4+7cPCPg5x4z151p0ngWyyO5DecfDmMXmpyUkmwucmWmEnkVqwT6BzPqjgbqD8yP1OolWnR0WiXKEH+UvEask0t0nxl5EEj+UYtbxbn5kqwR4RTRN1iwW4nZ5nJZP8ARVXs59kFfzE/ijsMXpWmj+iLZeHctvHyYjFcXJz+hCfx/Ds5+Dij4cnZqW1n6FVpNI5rVL9okekoJjqZNMKMda4zgd5eR+N16CipJOy0MJ7i0n8DdSLJ33LKITPya2s+3aPEPg5x7zb1PrEuVysw26nrwnUekcxEQS07JzqOKTmmnwOfArJHpHMR22JiYlZgPyzy2nE8lIODE3g3SridI8R4i0St35arh5ZHxHio+qwCN1+r7J+vFeVtv3erU2s0ZSp1r2Pr7DfBJ1phGXEY5IdGnaN+9Oo5pI664toeze79l12rt67qaZd05XLzLeVMTbYPltLx4w7xoU8iBG2eiXYzO8MlVuBt06Je5JV6e4/FHn7RNmls7QbSft66aU3UJBzxkjyXGV40caWNULHePQcjSPoTRjS6lxKAT0j9Zm8b2ngRu+R3FU7EcLcx2rILO48Vp84o/CYmPbhu63VsdqC6ijtavazrnCxVUIwpknk3MJHkL6BXkq6YPiiGTkaYMX2OZsrddhuFXXxOjOq4L1rduSu2nc0pcNt1WZplTk19oxNS6uFSD1HcQRoUnII0IMbG93bevoW1NuWtO8DL0a8QkIQAeGXqRHVnPkud7Z9KSRoNZpJghxxp1DrS1oWhQUlSSQUkHIII5EHrGPV0rKhva28V7U87ojlsW8eEUd3bN8jtDKWJtiqOF+KzI3K+cBXQImj0PQO8j7bHlG8KFpcQFoUFJUMgg5BEVieB8LtV6m45GyDWavFu206He9ozds3JLvzNLm08EwwzMuS/apznhKm1JVwnqM4PI5EQs9ukbA28oa2eNY6E1CaP/wAsWE6Yj8KUnmBHRsj25NJC5LQdoVc/zpewzps+Y+7Zr+9h+dL2G/8Ap+x92zX97Fi+zR7kQ7NHuRHbr5PiPmuOrbwUE27uy7H7buaUrtIsOSan5RfaMOuvPPhtXRQQ4tScjmCRodRrE1ScghhPERlXM5juBKRyGI+o6Oe52bjddgANixq+NLXGPq6P7YjvMSJfOlrp/h0fIYjnMfM/Sv8A+c/kb6q6YEP8L4leHccxUSqUp1PeSyqbX2anNQRqAAD0Gup5xndl2LK0ZkKCe2mFDDkypOCfMn3KfN16xhdRTx3BRs/6yn79ETtItpblEgDWLb0SUFO+CWpcwF7SADwvf8e9c6R1csdPFTsNmuuTbfY5X9l9y8q3LoCUgCOeEI3SqWkNcQh1giQ6QgIIkIcoQRIeuEIImesIQgiRhd1XMUrXS6e5jHivOpP9Uf2n1R6901r2Jo5SyvEy/lDfekdVer5TEYcRKsnWNOdJmmL6QfkmidZ5HbI2gHY0d5GZ7rcVYsFw4Sfp5BkNnuvtSgEla1BKQMkk4AEfVLpVZuYhVOzI08/6c4jK3R9aQenv1adwMelbVtG5X0VCfRmktqy0yeU0oHy1d7YPIe2IydMZlFpltpAShIGOsRehHRuyojbiGLDsnNrNlxxdz3Dz4LPxLGBTExQ5v3ncO6288b5DZmdmLUawqNS1B8Swdmj5Uy+e0dV/KPL1YjI00+WSPpYJHfHaiBts29HaOyyYdo1MlVXHXkEoclpd0IYlVY8l53XCveJBPfiN8YdhgsKejjAA3AWA9FTqutJPW1D7niSpz8GlyMdmkR8GTliSAgA+aNclyb4G2iuzK106tSNBYUdGadJoJA+zc41H4o8KV3oNuUpMB9vaDOuqGvA/LsOJPqLcWNui9SRcuaDzPsoc43ADYA/Xiti9ZsSiVVReclUomfazLJ7N1J8yh/bmMFq1FrNtBTk8VT9OT/paEYdZHe6kcx75PrEV1sffmuiRmG2L/tyRq8rnCpqmfpaYSO/gJKF+jxYt1Ye0qxtq9uKqlo1lmfbRhL8urxH5ZRHkuNnVPp5HoTFB0s6O6XEIz9ris7c9u0c+PI+CseFaRub2WO1m/CfTh4ZcQVg4WlbaVoUFJUMhSTkEd4jM7TuQ8aKVUl8ST4rLqjy96T8nwR4d02x9DjqqlTkYpS1ZfYSNJZRP0xPcgnyh7XmNMx4hWUq65j5yLMT0Hxbbs/pe368QVdHRwYlT3bsPmD7qV61QpKq09+Sm5VmZlphstPMPIC0OIOhSpJ0IPcYg1zdK2Idqo/QBL4JzgTkyAPQO00ETXaNaNWpHZzC8zTGErJ9sOiv+eoj3+FJ9qI+msIxaPEKRlZSuOq8X9we8HIqiVNMYpDHIMwq5jdK2ID/wAx92zX97D86ZsPxrs/Y+7Zr+9ixfAj3IhwJ9yIkuvl+I+a8OrZwVe2N0nYM4oIe2eMkeaemh/wDLE12latEsm0ZS2rdl35emSieCXYemXJjsk8+FKnFKVwjoM4HIaR7QSkckiP3pHV0j3ZOJK5DQNgSAhCOi7JCGYZgiGHSEPNBFjF9nFrJ0/wBIR8hiN86RI9/HFqJP7oR8hiNOLzx819Ko/Xf8jfVXfABel8SupNa3DRtP9JT9+iJ5lhiWTECvn9X6N9tJ+/RE9MfSExduiH9in/iHqsPSj/Q5O+a5YeeEI28qokOkIQROkIiXeYrNWt/dfuerUOqTdMn2Ey/ZTUo6WnEZmGwcKGoyCR6413nbNtbzj80y68fxo7+VEzh2DPrYzI14FjZR9ZiDaZwaW3uttUI1KjbLtaH/AJl3Z/vR78qP382baz/6l3X/AL0d/KiQ/NeT/cHkVh/lxnwFbac65hGpY7ZtrR/8zLr/AN6O/lQ/Nm2s4/XLuv8A3m7+VD815P8AcHkn5cZ8BW2nX1wiv255clw3TsDnKjc1bqFXm01mYaTMTz6nlhAbaITxKOcAk6ecxO1UmvAaLNzmQC00pQPnxp8cVjEAKEydYcmXueSmqd3XtaWj73qo0uqpGoXK+Uqy0yexb7sDmfWcx51Opi63V2KUkqDbuVPqScFLQxxYPechI+yJ6R0SonUnJPOJA2e00NyE1VXU+O+52SD3IR/+xV8UfL+itC7SXSHrqrNtzI7kDkOVyByWwKyQYfR9jaBYc+PqsvlpdqVlES7LaUIQkJSlIwAAMAAd0c3SHSMO2rTMpK7DbufnaqKYwKPNJVOcfAWSWlAEHvyQB1JIA1j6gY25DVQCd6rhvF71bdN8NsPZhUQqeBLM/XGFAiXPJTbB6r6FzknknJ1FJ1TK1lYeUpwLOV8RJ4jnOSe/OuY8piaStpIOEuADiR3eiOXtcxszD4YaOLUiG3ad55+ypdZLJUSXf4DguR5Ql8kElvmD19HpiadlO6xtK2pUqUuN+YlrXt+aSHJeZnGy7MTKDyW2yMeKeilFIPTI1iEe1ylSVJStJGClXI+aNvOy+77evvZPRLltns0yL8shIZRjMstACVMqA5FBHDjzA8iIisdrpqdjepyB38FnYVSxyk9YLkKszO4Rb6WOGY2h3I44RqtuXl0Jz9iQr5Y+6JufXzs7vin3Xsy2sJl5yXcSFoqdPKQ60SONtZaUQtJGfFUnHLUHBFxoRVTidUQQ55IPFTwpIQbhoC4XmETMsth9CVoWkpUlQyCDoQR3GIaqlKcoNaepSuJTSMLl1K1KmjyBPekgp9QPWJr6Rhe0OnB2lS9UbHjy7nAo45oXp98EmNadImCMxLCHygduLtA9w+8PLPmArJgVWYagRn7r8vHd7eKxa2KoaZcjDilYacPZOfYnr6jgxLvKIFCjnngxNlGnPD7fk5snJcZSVenGD8Yip9EWJucyfD3nIWcPHJ3p5lZ2klMGlkw35H09V3siEIeqN0KrJCEIIkICEESHqhCCJCEIIsV2gHFpJ+2EfIYjDjiTdoZxaCD+6UfIYi3ij5v6Ux+u/wCRvqr3o629J4n0XE7rXqP9tJ+/RE/sfSExX8nNepH20n79EWAY+kJxF06Iv2Oo/iHqsHSrbDyd81yQh0hG3FUk6QPdCEEUK72ZxuhXb9jLfOWo1hcfdzjZ5van/qgXcfey3zlqNXoWAcxctHXWp3c/QKu4y28jeSmKxd2/adtFseUuy3UUT2Omy4GjNTxaX4iyhWU8Bxqk9YyL851tn+p21/vNX91Ftt0Thc3QrYJSD+iTnT91OxOPZo9yPgiOqccqo5XsaRYEjYs2LDKdzGuIzIG9azapunbXaNQZ+rzrdv8Ag0jLOTT3Z1EqVwNoK1YHZ6nCTpEGhQwFD0xt62mpQnYleKgkAihzvT9zrjT6hfip9A+SJnBsRlqmvMu5RuJUccJb1Y2rYvuNq4t22e81emfwbMTxebvZWTOH3XAj4VCIF3GDndqnj+/0z+DZid75QVWNOEe1KFf1xGuNNy40dfq7dR/9pVqwQDXgB4t+YUT8esS7RXJWjWBLTU68hmXYlTMPOrOAhOCtSj5gMmIc44mqhpZn7MkkPtIdZdlUoW2sBSVDhwQQeY5jEaS6Ig0V1RfbqD55+iuGk4IhZwv6LX3t63sa/f1XXQtn1Qn6Ja7Dmkyw4piZqChyWpSSFIb6pQDk81a4Aia7dru0a/7WlLdum8qnUpKVIWiXeWAhwjkpfCBxqHQqzjnEk70m7q/sory7stSVcdsyddwEJyo0t1R0aV9bJ8hR5eSdeEmuAeIVnOCI+tsPdS9U0xNBA47QfdalrBP1h13H0XG+Cl3jR4q0RzNPhxAUMZ64iy253s12dbT7/rq71lG6nN0qWaflaU+CWHUqUUqdWkaL4SEAJJx4+SDpi0+1PdR2YX7ZrspRKBTLYrjScydTpkqlnhUOSXUIwHGzyIOo5gg88OoxZlPOY7ZcV7xYe6WIPvmtYhcA5mLzbkU6LOteckbsnE0ld2zqHrflJt0IM6Gm1JcW2jOdfFHEQArhASTiIkuXd9b3fJBm/tqTctdrHEhim0inNuplXJsgn9OOqA4WU4yEjV0+L4ozmGbhva5LtvNy6axVHV1FS0KbdaPZBgI+loaSnRtCMDhCeWO/WPYgYkwxtPZ49/1t+rdG3onBzhnwW5AEHkc+eEUe3d97eeYqjVnbW6uualZhfDKV+ZI42Fk6ImCOaCeTnNPttNRd9C0uIDjagpKhkKByCIqlZRS0j9SQcjuKnKeoZO3WYvrzx5VyS4mrSqDJH7ApQ9I1HyR6vSPOr7yWLWqLquQl1/ekRDYpq/Y5tfZquvysVm0xIlZbbcfNQjxDMS3Yr3a2RLZ9otxH9YxD3EYl6wEFNjS6j7dxxQ/nn8UaH6KQ4YvJbZ1Z/uarrpM0CkH8Q+RWTwhyhH0MqIkIQgiQhCCJAwhBEh0hDpBFiO0c4s5H2yj5FRFXFEp7STizUfbSPkVEUcUfOfSiP11/I31WwNGhej8T6L9R41dpP22j79EWCY/7OmK9NrxXqSO+bR9+iLCsfSExceiT9jqP4h6qN0sFjDyPzXJCEOkbbVRSHKEIIoS3tzjc9u/7GW+dNRq249Y2kb3Wm51eB7kS3zpqNWHH40WrA32gdz9AoPFG3kHJbSdz053PbXP1yc+dOxOkQTud67nVrn65OfOnYnaK7Vm87+Z+amIf8tvILE9qH6x15n94p75uuNOqHP0NI8w+SNxW1H9Y28/4invm6402oV4ifsR8kT2AOsx/govFRfVWyLcUOd2ieP7/AM1+DZixVxShnrUqEqkZWthXD9kBkfGIrnuInO7LO/x/Nfg2Ys6RkYiv4vC2okmifsdcHkclKUTzGxjxtFiq8BeQFZ0OsS3s9qKZu0vBeLK5VwoI96fGHyn4IjS5ad7D3POSQTwthfG150K1Hwaj1R37HriaNcqe3XwysyA06TySc+Kr1H4jHzHotVnR3H+qqchcsd4nbyuAeS2XitOK+h14s9jh9clLdYo1LuCgzdFrcgxPU+caUxMSz6OJDqFDBSod0a39ru6FtAtna2zTNntDna/btVd/SMwk58CydWplZ0QE5yHDopPvgRGy7ORoY/CAcZAj6fpquSnJLDtWspoGSizlC+73u+ULYla7rvbCo3NUG0pqFSwUpwDkNNJPktg65OqjqcaATTCEeMkjpHFzjclejWho1W7F4N7WxJXps7rVqz7Uu4xUpNyW/TDQdQhSkkJWUnnwq4VDzpGI1CXjaFxbOr9n7MuuTMtVJFWDjVD6D5LrZ9shQ1B9IOCCBuZEQnvHbBKZtnsArkkMSt2U5Cl0ufUMBXUsOH6ms9faqwodQZDDK80r7H7p2rFrKUTs7wtXiF95i1m7TvSv2W9KWHtBnFvW0cNSdScJUum9yVnmpn40fY6CqE/I1Si1ybotbkX5CpSTypealX08K2nEnBSR/wA/BH4lw98W+VkVXFqPzB+slXo3SU0ms3at17D7EzLNzEs8h5l1IWhxtQUlaSMggjQgjrGL7Qp8SdnrYCsLmlhsDrgan5Pjii27PvQvbN5iWse+Jl2ZtJxXDLzasrXSlE/CWc80808xpkRcXaLKztRlJK5qfMNz9GEuFYljx8KVeN2ySMhaCCM45AZGRmNSae0dZSYXUR07NYuFsvhP3j4C+SvOj0sNVVRlzrZ7+O4eJWCcedc8ona2pNUhaNPlVjC0MJKh746n4zEL27ICtXLJSCMKacUHFlOo7NOpPr0H8oRPg0AEa36KMLcxk9e8bbNHhmfTyVl0rqBeOnHM/Ieq/YQhG4VTkhCHSCJrCEIIkIQgidO6EOsIIsN2mHFloP7qR8ioiTi1iWtp5xZSD+6m/kVEQ8UfO/SeP1z/ACN9VsXRgXovE+i+mz+r9H+20ffoixbP0hMVqL6Grho3GtKE+FoJKjgAcaNcxYdquUUNAezEh90I/HFt6Knsjo59cgXcPVYGlsL3GEtF8nfNelAnQR0fZqjfttI/dCPxw9mqP+20j90I/HG1PtUPxjzCp3USfCfJd7OkOsdH2Zo/7bSP9Oj8cfvs1R/21kf6dH44faofjHmE6iT4T5KHN70H85xeGvtZb501Gqzi8aNpO9zVKa/ueXe0xUJV5wolsIbeSon9NNdAY1YlXjHEWfBJWuhcWG+foFC4lG4PAcLZLahucf5m9rH65OfOnYnjzxA25t/ma2r/AAk586dieYhqk3mfzPzUjF9xvJYntR/WNvP+Ip75uuNNCV/oafsR8kbltqX6xd6fxDPfN1xpiSrxE/Yj5ImMGdZr1H4iL6q2Vbhuu7HPH9/5r8ExFoIq7uFHO7BO/wDuCa/BsRaKImsN5381nwf5beSwTaPb65+mIq0qgqfkwStKRq43zUPSPKHrHWIo48pBBBBGmOsWQWgLQUqGREMXvajlDn3KlKN/qa6rJSkaS6ifvCeR6HTliNM9I+irp/1rStuQO2BwGx3gMj3WO4q86M4qB/g5T/D7e3lwWUWFeKJlhuh1R7EwgcMu6s/TB0ST3jp3xIMVoKilQOSCOvdEgWztLek0Ikq8lcwyNEzSdVpHvh7b08/TGJobp+yGNtDihyGTX93B3ofPiu2NaOOc4z0gvfa329vJSvAx1KfVKfVZYTFOnGZls9W1Zx6RzEdvrG44Z452CSJwc07CDceapb2OYdVwsUhDrDHfHquqq1vZ7tw2jURzaBZMiPovkGsPyzYwaowkeR53kjyD7YeL7nGuVDigopUlSVJJSpKhgpI5gg8jG7tTzKnxLlxHaEcXZlQ4iO/HOKR74W7St0zm13Z9TsvAF6u0yXRq4Bzmm0jmofsgHMePzCszGFYkGnqnHL5Hgo+to9ca7RmqTpcxyiye7bvPTWzScZsu9XnpyzZheG3Tla6Uony0DmWidVIHLVSeoNYELyMg5jlSrXOYsUzWVEfVv2KIic6F+s1bl7Xty3pJ964KA80/L1JCHmnGVhbXARxZaI04VZ4tNO6Mo1jWluz7z09ssqjNo3g+9N2XMLwlWq10tZOq0DmWiTlSBy8pOuQrZJIT8lVaXL1KmzbM3JzLaXmJhhYWh1ChlKkqGhBHWKXLhraA9VG0BuZFhYZm58b7VZW1rqv9I83PftyyXZhCEeK7J6IQ6w6QRIQh6oIkIQgiQhCCLCtqP/0Qj7bb+RUQ9xRM20iUnZ2zkNSElMTjomUKLcujiVjCtcd0RIaJX0q8a3qqD3eD/wCMaI6RcKrKrFusghc5uqMw0kb+C2HozPEyis94BudpA4LpkA+UhKh04kg/LH6CEjAQ2B5m0/ijuew9d/2eq33P/jH57D13/Z2rfc/+MUT8gYn/AMZ/9DvZWD7XTn/Ub5j3XV7RXvf5ifxQ7Vz3v80fijs+w1eOn0PVb7n/AMY/fYWu/wCz9V+5/wDGH5v4l/xn/wBDvZPtNN8bfMLqF5zHMY+xH4o+C+4BoRn7EfijvGiV7pb1V+5/8Y4zQ6+f/D1V+5/8Y5Gj+Jf8Z/8AQ72XIqaX42+YUU7eSt3d7uQrwcNNHQD6u3FGCcKjYBtgsy9a/sYrtFoto1qbnZhpsNMty+qyHUKPXuBPqipqN3Hbu4OIbKrlx3+Dp/Kj6J6JYZKLCZY6lpY4yE2cLG2qzPNay03AmrWOiII1Rsz3ngtgm5r/AJmdqH65OfOnYnqIb3WLar1obrFuW/c1ImqTVJdc0XpOaSEuI4plxScgE8wQfXEydYts5BkcRxKhYxZoCxLan+sVeh/eGe+brjS6lX6Gn7EfJG6raLJTlU2P3XTafLLmZuao84www2MqcWphaUpHnJIHrjVKndt27pbSDsquTOB+wJ7vsoksMlawO1jZYlZG59rBXb3CP816d/8AcE1+DYi0kV33MbMuuxd3qcot40GdotQVWph9MtOICVltTbICsAnQlKvgixER1S4OlcRxWVELMAKeeOGZlmpphTTqEqSoFJChkEHoR3RzdIR4r0UNXVs9nKWtc5QWVzUrnKpMHLjf8GT5Q96dR0zyjBEvBZVgkFJ4VJIIKT3EHUHzGLPLQlxPCsBQjGLhsSiXAe0mZbhmAMJmWVdm6n+UOY8xyI1lpF0cU9a41GHkRvO1v7p5W+7+I7grjhelTogI6wFw+IbfHjzyPNQYxOzEo8HpWYdYcHJbaik/FHvyu0O7ZVISmqF1I6PtpWfh5x6dR2UVmVKlUypS82jo3NoLS/56AQf5ojHpmzrvllYct590DrLOtug/1gfijXjtHNIcKcepY8d7CT/afmrQK3Cq4Xc9h/isD/8AVivd/NUujhwfAwe/sf8AGPNndoN2zqS2uqrZQf8AV0Bv4xrHk/Q7c6jwm2Kvn+A/xjuS9l3jMEBNvusj3Uy820B6gSfijkx6T1X6N3XEfz28dy5EGEQ9r9GPFq6snWahJVZupszbvhSFcXaqUVE+Y55g90Tna1zyV10YPNhLcygAPyxOqD3jvSehiO6VsjqUytLlYqyGEZ1ZkkZJ83aLGnqTEm0C2aPbkspulySGVOY7RzVS3MdVKOpi/wCguj+MYXI59SQ2J21pNyTuItkDxzzG7ZasaSV+HVLA2E3eNhAytwN9vdbzVB97PdiXZk9N7Tdn8gfodeWXapTWE6U5ZOrqAP2Ek6j2hPuT4tSO0jeFNSzM5KOS0y0h1lxJQttxIUlSSMEEHQggkEHnGtrel3YpjZnUpi+bGkluWc+5xTMqgFRpK1H42CThJ9qTwnThMbsw+v2RSHktdVdLftsVYwvryi1u5ptzuW39pNL2TzvbVO3qw+tuWaJKl097hUvib+tq4TxJ5AniGNc1Uk5Scn6gzIU+Vfmpp9wNMy7CCtxxZOAlKRqSTyAjZLuo7tQ2WU36NrvYbcvCeZ4EsZCk0xpXNsHkXVacahy8kdScvEJ42xFr8ydnuvCjjfr6zdis/wBMwhDpFYUymIQhBE6QhCCJDEIQRIdYQgi/Dy11jjMuyTktpz6IQgieDsfUk/BDwZj6kn4IQgieDMZ+lp+CHg7P1NPwQhBE8HZ+pp+CHg7H1NPwQhBE8GYPNpPwR+pYZToltOPRCEEXIAAMAYENYQgidY+FNNqOS2k+qEIIvvCUjA0hpyhCCJCEIIkIQgic4+S22eaUn1QhBF89i17hPwR9BCBySBCEEX1CEIIkdafkZSp05+nz0u1MSr7amnWXUBaHEKGFJUk6EEEggwhBFGlg7uuyXZndsxcto2s3LVJ7iCH3nlvmWSeaWeMnsweWmuNM40iUwBjAGPRCEdnOLjdxuuAANi/fMYQhHVcpCEIIv//Z";
const COLORS = {
  navy: "#16263B",
  navySoft: "#1F3350",
  paper: "#FFFFFF",
  paperDark: "#E7E9ED",
  card: "#FFFFFF",
  panel: "#F7F8FA",
  orange: "#F0AD25",
  orangeDark: "#D89412",
  steel: "#6B7280",
  ink: "#1A1A1A",
  green: "#3B7A57"
};
const CONTRACTORS = [];
const ARCHITECTS = [];
const LEVEL_STYLE = {
  Or: { bg: "#F4E3C5", text: "#8A6116", border: "#D9B45F" },
  Argent: { bg: "#E4E6E8", text: "#4B5257", border: "#B7BCC2" },
  Bronze: { bg: "#E9D3C0", text: "#8A4A22", border: "#C98A5B" }
};
function Seal({ level = "Or", size = 88 }) {
  const style = LEVEL_STYLE[level];
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        width: size,
        height: size,
        borderRadius: 12,
        border: `1px solid ${style.border}`,
        background: style.bg,
        color: style.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexShrink: 0
      }
    },
    /* @__PURE__ */ React.createElement(ShieldCheck, { size: size * 0.32, strokeWidth: 1.75 }),
    /* @__PURE__ */ React.createElement(
      "span",
      {
        style: {
          fontFamily: "'Poppins', sans-serif",
          fontSize: size * 0.13,
          letterSpacing: "0.02em",
          marginTop: 2,
          fontWeight: 600
        }
      },
      level.toUpperCase()
    )
  );
}
function TrustPill({ value }) {
  const color = value >= 90 ? COLORS.green : value >= 75 ? COLORS.orange : COLORS.steel;
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      style: {
        fontFamily: "'IBM Plex Mono', monospace",
        color,
        borderColor: color
      },
      className: "inline-flex items-center gap-1 text-[11px] border rounded-full px-2 py-0.5"
    },
    /* @__PURE__ */ React.createElement(ShieldCheck, { size: 11 }),
    "Confiance ",
    value
  );
}
function DashedDivider() {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        height: 0,
        borderTop: `1px solid ${COLORS.paperDark}`,
        margin: "0 auto",
        width: "100%"
      }
    }
  );
}
function BrandMark({ size = 36 }) {
  return /* @__PURE__ */ React.createElement(
    "img",
    {
      src: LOGO_ICON,
      alt: "R\xE9no-Confiance",
      style: { width: size, height: size },
      className: "object-contain shrink-0"
    }
  );
}
function Logo({ light, size = 36 }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement(BrandMark, { size }), /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { fontFamily: "'Poppins', sans-serif" },
      className: "text-lg font-bold tracking-wide leading-none"
    },
    /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.orange } }, "R\xC9NO"),
    /* @__PURE__ */ React.createElement("span", { style: { color: light ? "#fff" : COLORS.navy } }, "-CONFIANCE")
  ));
}
function DashSidebar({ items, onSignOut }) {
  return /* @__PURE__ */ React.createElement("aside", { style: { background: COLORS.navy }, className: "rounded-lg p-3 flex flex-wrap md:flex-col gap-1 h-fit" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 px-2 pb-3 mb-1 border-b border-white/10" }, /* @__PURE__ */ React.createElement(BrandMark, { size: 26 }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Poppins', sans-serif", color: "#fff" }, className: "text-xs font-semibold" }, "R\xC9NO-CONFIANCE")), items.map((it) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: it.label,
      onClick: it.onClick,
      style: {
        background: it.active ? COLORS.orange : "transparent",
        color: it.active ? COLORS.navy : "#ffffffb0",
        fontFamily: "'Poppins', sans-serif"
      },
      className: `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-left ${it.onClick ? "cursor-pointer" : "cursor-default"}`
    },
    /* @__PURE__ */ React.createElement(it.icon, { size: 14 }),
    " ",
    it.label
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onSignOut,
      style: { color: "#ffffffb0", fontFamily: "'Poppins', sans-serif" },
      className: "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium mt-2 md:mt-auto hover:text-white"
    },
    /* @__PURE__ */ React.createElement(LogOut, { size: 14 }),
    " Se d\xE9connecter"
  ));
}
function StatCard({ value, label }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-2xl font-bold leading-none mb-1" }, value), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-xs" }, label));
}
function StatusTag({ statut }) {
  const map = {
    en_attente: { label: "En v\xE9rification", bg: "#F4E3C5", color: "#8A6116" },
    publie: { label: "Projet publi\xE9", bg: "#DCEEE3", color: "#1F6B45" },
    complete: { label: "Compl\xE9t\xE9", bg: "#E4E6E8", color: "#4B5257" }
  };
  const s = map[statut] || map.en_attente;
  return /* @__PURE__ */ React.createElement("span", { style: { background: s.bg, color: s.color }, className: "text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap" }, s.label);
}
function SectionBand({ eyebrow, title, subtitle }) {
  return /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-10 border-b", style: { background: "#fff", borderColor: COLORS.paperDark } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { fontFamily: "'IBM Plex Mono', monospace", color: COLORS.orange },
      className: "text-xs tracking-widest uppercase mb-2"
    },
    eyebrow
  ), /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
      className: "text-2xl md:text-3xl font-semibold"
    },
    title
  ), subtitle && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mt-2 max-w-xl leading-relaxed" }, subtitle)));
}
function NavTab({ label, active, onClick, locked }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      style: {
        fontFamily: "'Poppins', sans-serif",
        color: active ? COLORS.navy : COLORS.steel,
        borderColor: active ? COLORS.orange : "transparent"
      },
      className: "px-3.5 py-2 text-sm font-medium transition-colors border-b-2 flex items-center gap-1.5 hover:text-opacity-80"
    },
    label,
    locked && /* @__PURE__ */ React.createElement(Lock, { size: 12 })
  );
}
function StatBlock({ number, label, icon: Icon }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.orange },
      className: "rounded-full p-2.5 flex items-center justify-center shrink-0"
    },
    /* @__PURE__ */ React.createElement(Icon, { size: 18, color: COLORS.navy, strokeWidth: 2 })
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
      className: "text-2xl font-semibold leading-tight"
    },
    number
  ), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-sm" }, label)));
}
function HomeView({ goTo }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("section", { className: "px-6 md:px-14 py-16 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-5 flex-wrap" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { background: "#F4E3C5", color: "#8A6116", borderColor: "#D9B45F" },
      className: "text-[11px] font-medium px-2.5 py-1 rounded-full border flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement(MapPin, { size: 11 }),
    " Actif partout au Qu\xE9bec"
  ), /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { background: "#DCEEE3", color: "#1F6B45", borderColor: "#9BCFB3" },
      className: "text-[11px] font-medium px-2.5 py-1 rounded-full border flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement(CheckCircle2, { size: 11 }),
    " 100 % gratuit pour trouver un entrepreneur"
  )), /* @__PURE__ */ React.createElement(
    "h1",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
      className: "text-4xl md:text-5xl font-semibold leading-[1.1] mb-2"
    },
    "Vos projets.",
    /* @__PURE__ */ React.createElement("br", null),
    "Des professionnels v\xE9rifi\xE9s."
  ), /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: COLORS.orange },
      className: "text-3xl md:text-4xl font-semibold mb-5"
    },
    "Une confiance renouvel\xE9e."
  ), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-base leading-relaxed max-w-md mb-7" }, "D\xE9posez votre projet de construction ou de r\xE9novation, et soyez jumel\xE9 \xE0 des entrepreneurs \xE9valu\xE9s, qualifi\xE9s et certifi\xE9s \u2014 du premier appel jusqu'au dernier clou."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => goTo("submit"),
      style: { background: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
      className: "text-white px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2 hover:brightness-110 transition"
    },
    "Soumettre un projet ",
    /* @__PURE__ */ React.createElement(ArrowRight, { size: 16 })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => goTo("join"),
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
      className: "px-6 py-3 rounded-md font-medium text-sm hover:brightness-110 transition"
    },
    "Je suis entrepreneur"
  ))), /* @__PURE__ */ React.createElement("div", { className: "relative w-full max-w-md mx-auto" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.orange },
      className: "absolute -top-5 -left-5 w-full h-full rounded-tl-[90px] rounded-br-3xl"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative rounded-2xl overflow-hidden shadow-lg" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://images.unsplash.com/photo-1757359056339-22968344cce6?fm=jpg&q=70&w=900&auto=format&fit=crop",
      alt: "Maison r\xE9nov\xE9e",
      className: "w-full h-full object-cover block",
      style: { aspectRatio: "6/5" }
    }
  )), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: "#fff", borderColor: COLORS.paperDark },
      className: "absolute -bottom-5 left-5 border rounded-lg shadow-md px-4 py-3 flex items-center gap-2.5"
    },
    /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.navy }, className: "w-8 h-8 rounded-full flex items-center justify-center shrink-0" }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 16, color: COLORS.orange })),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-xs font-semibold leading-none" }, "100 % v\xE9rifi\xE9s"), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-[11px] mt-0.5" }, "RBQ \xB7 Assurances"))
  ))), /* @__PURE__ */ React.createElement("section", { className: "px-6 md:px-14 py-12 border-t", style: { borderColor: COLORS.paperDark } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto grid sm:grid-cols-3 gap-8" }, /* @__PURE__ */ React.createElement(StatBlock, { number: "1.", label: "Soumettez votre projet et vos crit\xE8res", icon: ClipboardCheck }), /* @__PURE__ */ React.createElement(StatBlock, { number: "2.", label: "Nous v\xE9rifions licence RBQ, assurances et ant\xE9c\xE9dents", icon: FileCheck2 }), /* @__PURE__ */ React.createElement(StatBlock, { number: "3.", label: "Vous choisissez parmi des entrepreneurs certifi\xE9s", icon: HardHat }))), /* @__PURE__ */ React.createElement(DashedDivider, null), /* @__PURE__ */ React.createElement("section", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto" }, /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
      className: "text-2xl font-semibold mb-2"
    },
    "Quatre profils, un seul chantier"
  ), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "mb-8 max-w-2xl" }, "La plateforme relie particuliers, entrepreneurs, architectes et \u2014 bient\xF4t \u2014 assureurs autour d'un m\xEAme standard de confiance."), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-4 gap-5" }, [
    {
      icon: Building2,
      title: "Particuliers",
      text: "D\xE9crivez votre projet une fois, recevez des offres d'entrepreneurs d\xE9j\xE0 v\xE9rifi\xE9s.",
      tabId: "submit"
    },
    {
      icon: Hammer,
      title: "Entrepreneurs",
      text: "Faites certifier votre entreprise et acc\xE9dez \xE0 des projets qualifi\xE9s dans votre r\xE9gion.",
      tabId: "contractors"
    },
    {
      icon: PenTool,
      title: "Architectes",
      text: "Affichez votre profil et recevez des demandes de plans directement des particuliers.",
      tabId: "architects"
    },
    {
      icon: ShieldCheck,
      title: "Assureurs",
      text: "Rep\xE9rez rapidement des entrepreneurs certifi\xE9s pour vos dossiers de r\xE9clamation. (Bient\xF4t)",
      locked: true,
      tabId: "insurers"
    }
  ].map((c) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: c.title,
      onClick: () => goTo(c.tabId),
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "border rounded-sm p-6 relative cursor-pointer hover:shadow-md transition"
    },
    c.locked && /* @__PURE__ */ React.createElement(Lock, { size: 14, style: { color: COLORS.steel }, className: "absolute top-5 right-5" }),
    /* @__PURE__ */ React.createElement(c.icon, { size: 22, style: { color: COLORS.orange }, strokeWidth: 2 }),
    /* @__PURE__ */ React.createElement(
      "h3",
      {
        style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
        className: "text-lg font-medium mt-3 mb-1.5"
      },
      c.title
    ),
    /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, c.text)
  ))))));
}
function SubmitView() {
  const [form, setForm] = useState({
    type: "",
    description: "",
    budget: "",
    region: "",
    ville: "",
    echeancier: ""
  });
  const [planFile, setPlanFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [permitNo] = useState(
    "PRJ-" + Math.floor(1e3 + Math.random() * 9e3)
  );
  const submitProject = async () => {
    setError("");
    setSending(true);
    try {
      let planUrl = null;
      if (planFile) {
        const path = `${Date.now()}-${planFile.name}`;
        const { error: uploadError } = await supabase.storage.from("plans").upload(path, planFile);
        if (uploadError) throw new Error("\xC9chec du t\xE9l\xE9versement du plan");
        const { data: pub } = supabase.storage.from("plans").getPublicUrl(path);
        planUrl = pub.publicUrl;
      }
      const { data: sessionData } = await supabase.auth.getSession();
      const clientUserId = sessionData?.session?.user?.id || null;
      const { error: dbError } = await supabase.from("projects").insert({
        categorie: "construction",
        client_user_id: clientUserId,
        type: form.type,
        description: form.description,
        budget: form.budget,
        region: form.region,
        ville: form.ville,
        echeancier: form.echeancier,
        plan_url: planUrl
      });
      if (dbError) throw new Error("\xC9chec de l'enregistrement du projet");
      try {
        const data = new FormData();
        data.append("formulaire", "Soumission de projet");
        data.append("dossier", permitNo);
        Object.entries(form).forEach(([k, v]) => data.append(k, v));
        if (planFile) data.append("plans", planFile);
        await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data
        });
      } catch (e) {
      }
      setSubmitted(true);
    } catch (e) {
      setError(
        "L'envoi a \xE9chou\xE9. V\xE9rifie que SUPABASE_URL / SUPABASE_ANON_KEY sont bien configur\xE9s en haut du fichier, et que le sch\xE9ma SQL a \xE9t\xE9 ex\xE9cut\xE9."
      );
    } finally {
      setSending(false);
    }
  };
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const inputStyle = "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition";
  if (submitted) {
    return /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-20", style: { background: COLORS.paper, minHeight: 420 } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        style: { background: COLORS.card, borderColor: COLORS.paperDark },
        className: "max-w-lg mx-auto border rounded-sm p-8 text-center"
      },
      /* @__PURE__ */ React.createElement(CheckCircle2, { size: 40, style: { color: COLORS.green }, className: "mx-auto mb-4" }),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          style: { fontFamily: "'IBM Plex Mono', monospace", color: COLORS.steel },
          className: "text-xs tracking-widest uppercase mb-2"
        },
        "Dossier ",
        permitNo
      ),
      /* @__PURE__ */ React.createElement(
        "h3",
        {
          style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
          className: "text-xl font-semibold mb-2"
        },
        "Projet re\xE7u"
      ),
      /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed mb-6" }, "Votre projet \xAB\xA0", form.type || "r\xE9novation", "\xA0\xBB a \xE9t\xE9 enregistr\xE9. Des entrepreneurs certifi\xE9s dans votre secteur pourront maintenant vous soumettre une offre."),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setSubmitted(false),
          style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
          className: "px-5 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide"
        },
        "Soumettre un autre projet"
      )
    ));
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Formulaire de d\xE9p\xF4t \xB7 100 % gratuit",
      title: "D\xE9crivez votre projet",
      subtitle: "Plus votre description est pr\xE9cise, plus les offres re\xE7ues seront pertinentes. Aucun frais pour d\xE9poser un projet et recevoir des soumissions."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-2xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Type de projet"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: form.type,
      onChange: update("type"),
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "S\xE9lectionner\u2026"),
    /* @__PURE__ */ React.createElement("option", null, "Toiture"),
    /* @__PURE__ */ React.createElement("option", null, "R\xE9novation cuisine"),
    /* @__PURE__ */ React.createElement("option", null, "R\xE9novation salle de bain"),
    /* @__PURE__ */ React.createElement("option", null, "Fondation"),
    /* @__PURE__ */ React.createElement("option", null, "Agrandissement"),
    /* @__PURE__ */ React.createElement("option", null, "\xC9lectricit\xE9"),
    /* @__PURE__ */ React.createElement("option", null, "Autre")
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Description du projet"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: form.description,
      onChange: update("description"),
      rows: 4,
      placeholder: "Ex. : Refaire la toiture d'un bungalow de 1200 pi\xB2, bardeaux d'asphalte\u2026",
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "R\xE9gion"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: form.region,
      onChange: update("region"),
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "S\xE9lectionner\u2026"),
    REGIONS_QC.map((r) => /* @__PURE__ */ React.createElement("option", { key: r }, r))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Ville"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.ville,
      onChange: update("ville"),
      placeholder: "Ex. : Victoriaville",
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Budget approximatif"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.budget,
      onChange: update("budget"),
      placeholder: "Ex. : 15 000 $ \u2013 20 000 $",
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Plans existants (optionnel)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png,.dwg",
      onChange: (e) => setPlanFile(e.target.files?.[0] || null),
      style: { borderColor: COLORS.paperDark },
      className: inputStyle + " file:mr-3 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-xs"
    }
  ), planFile && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-xs mt-1" }, planFile.name))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "\xC9ch\xE9ancier souhait\xE9"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.echeancier,
      onChange: update("echeancier"),
      placeholder: "Ex. : D\xE9buter d'ici 6 semaines",
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submitProject,
      disabled: sending,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: sending ? 0.7 : 1 },
      className: "px-6 py-3 rounded-sm font-medium tracking-wide uppercase text-sm flex items-center gap-2 hover:brightness-110 transition"
    },
    sending ? "Envoi en cours\u2026" : "D\xE9poser le projet",
    " ",
    /* @__PURE__ */ React.createElement(ArrowRight, { size: 16 })
  ), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs mt-2" }, error)))));
}
function ContractorsView() {
  const [query, setQuery] = useState("");
  const filtered = CONTRACTORS.filter(
    (c) => (c.name + c.specialty + c.city).toLowerCase().includes(query.toLowerCase())
  );
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Registre des certifications",
      title: "Entrepreneurs certifi\xE9s",
      subtitle: "Chaque dossier est \xE9valu\xE9 personnellement avant d'obtenir son sceau. Actif partout au Qu\xE9bec."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "relative max-w-md mb-8" }, /* @__PURE__ */ React.createElement(Search, { size: 16, style: { color: COLORS.steel }, className: "absolute left-3 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: "Rechercher par nom, sp\xE9cialit\xE9 ou ville\u2026",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm pl-9 pr-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, filtered.map((c) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: c.id,
      style: { background: COLORS.card, borderColor: COLORS.paperDark, borderLeftColor: COLORS.orange, borderLeftWidth: 3 },
      className: "border rounded-sm p-5 flex gap-4"
    },
    /* @__PURE__ */ React.createElement(Seal, { level: c.level, size: 78 }),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement(
      "h3",
      {
        style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
        className: "text-base font-semibold leading-tight"
      },
      c.name
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "'IBM Plex Mono', monospace", color: COLORS.steel },
        className: "text-[11px] shrink-0"
      },
      c.id
    )), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mt-0.5" }, c.specialty), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement(TrustPill, { value: c.trust })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mt-2 text-xs", style: { color: COLORS.steel } }, /* @__PURE__ */ React.createElement(MapPin, { size: 12 }), " ", c.city), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 mt-3 text-xs", style: { color: COLORS.navy } }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Star, { size: 13, style: { color: COLORS.orange }, fill: COLORS.orange }), c.rating.toFixed(1)), /* @__PURE__ */ React.createElement("span", null, c.jobs, " projets compl\xE9t\xE9s"), /* @__PURE__ */ React.createElement("span", null, "Certifi\xE9 depuis ", c.since)))
  )), filtered.length === 0 && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "col-span-2 border rounded-sm p-8 text-center"
    },
    /* @__PURE__ */ React.createElement(HardHat, { size: 28, style: { color: COLORS.orange }, className: "mx-auto mb-3" }),
    /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-medium mb-1.5" }, "Aucun entrepreneur certifi\xE9 pour l'instant"),
    /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-4 max-w-sm mx-auto" }, "Chaque profil affich\xE9 ici aura \xE9t\xE9 \xE9valu\xE9 personnellement. Sois parmi les premiers partout au Qu\xE9bec.")
  )))));
}
function ArchitectsView() {
  const [mode, setMode] = useState("browse");
  const [query, setQuery] = useState("");
  const filtered = ARCHITECTS.filter(
    (a) => (a.name + a.specialty + a.city).toLowerCase().includes(query.toLowerCase())
  );
  const [form, setForm] = useState({ type: "", description: "", ville: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const inputStyle = "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition";
  const submitRequest = async () => {
    setError("");
    setSending(true);
    try {
      const { error: dbError } = await supabase.from("projects").insert({
        categorie: "plans",
        type: form.type,
        description: form.description,
        ville: form.ville
      });
      if (dbError) throw new Error("\xC9chec de l'enregistrement");
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ formulaire: "Demande de plan \xE0 un architecte", ...form })
        });
      } catch (e) {
      }
      setSubmitted(true);
    } catch (e) {
      setError(
        "L'envoi a \xE9chou\xE9. V\xE9rifie que SUPABASE_URL / SUPABASE_ANON_KEY sont bien configur\xE9s en haut du fichier."
      );
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Volet plans & conception",
      title: "Architectes",
      subtitle: "Trouvez un architecte membre de l'OAQ pour vos plans, ou demandez une soumission directement. Actif partout au Qu\xE9bec."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mb-8" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMode("browse"),
      style: {
        fontFamily: "'Poppins', sans-serif",
        background: mode === "browse" ? COLORS.navy : "transparent",
        color: mode === "browse" ? "#fff" : COLORS.navy,
        borderColor: COLORS.navy
      },
      className: "px-4 py-2 rounded-sm text-sm font-medium uppercase tracking-wide border"
    },
    "Trouver un architecte"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMode("request"),
      style: {
        fontFamily: "'Poppins', sans-serif",
        background: mode === "request" ? COLORS.navy : "transparent",
        color: mode === "request" ? "#fff" : COLORS.navy,
        borderColor: COLORS.navy
      },
      className: "px-4 py-2 rounded-sm text-sm font-medium uppercase tracking-wide border"
    },
    "Demander un plan"
  )), mode === "browse" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "relative max-w-md mb-8" }, /* @__PURE__ */ React.createElement(Search, { size: 16, style: { color: COLORS.steel }, className: "absolute left-3 top-1/2 -translate-y-1/2" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: "Rechercher par nom, sp\xE9cialit\xE9 ou ville\u2026",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm pl-9 pr-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, filtered.map((a) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: a.id,
      style: { background: COLORS.card, borderColor: COLORS.paperDark, borderLeftColor: COLORS.orange, borderLeftWidth: 3 },
      className: "border rounded-sm p-5 flex gap-4"
    },
    /* @__PURE__ */ React.createElement(Seal, { level: a.level, size: 78 }),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement(
      "h3",
      {
        style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
        className: "text-base font-semibold leading-tight"
      },
      a.name
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { fontFamily: "'IBM Plex Mono', monospace", color: COLORS.steel },
        className: "text-[11px] shrink-0"
      },
      a.id
    )), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mt-0.5" }, a.specialty), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement(TrustPill, { value: a.trust })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 mt-2 text-xs", style: { color: COLORS.steel } }, /* @__PURE__ */ React.createElement(MapPin, { size: 12 }), " ", a.city), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 mt-3 text-xs", style: { color: COLORS.navy } }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Star, { size: 13, style: { color: COLORS.orange }, fill: COLORS.orange }), a.rating.toFixed(1)), /* @__PURE__ */ React.createElement("span", null, a.plans, " plans r\xE9alis\xE9s"), /* @__PURE__ */ React.createElement("span", null, "Membre depuis ", a.since)))
  )), filtered.length === 0 && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "col-span-2 border rounded-sm p-8 text-center"
    },
    /* @__PURE__ */ React.createElement(PenTool, { size: 28, style: { color: COLORS.orange }, className: "mx-auto mb-3" }),
    /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-medium mb-1.5" }, "Aucun architecte certifi\xE9 pour l'instant"),
    /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-4 max-w-sm mx-auto" }, "Chaque profil affich\xE9 ici aura \xE9t\xE9 \xE9valu\xE9 personnellement. Sois parmi les premiers partout au Qu\xE9bec.")
  ))), mode === "request" && /* @__PURE__ */ React.createElement(React.Fragment, null, submitted ? /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "max-w-lg border rounded-sm p-8 text-center"
    },
    /* @__PURE__ */ React.createElement(CheckCircle2, { size: 40, style: { color: COLORS.green }, className: "mx-auto mb-4" }),
    /* @__PURE__ */ React.createElement(
      "h3",
      {
        style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
        className: "text-xl font-semibold mb-2"
      },
      "Demande envoy\xE9e"
    ),
    /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed mb-6" }, "Des architectes membres de l'OAQ dans votre secteur pourront vous soumettre une offre pour vos plans."),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSubmitted(false),
        style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
        className: "px-5 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide"
      },
      "Faire une autre demande"
    )
  ) : /* @__PURE__ */ React.createElement("div", { className: "max-w-2xl space-y-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Type de plan recherch\xE9"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: form.type,
      onChange: update("type"),
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "S\xE9lectionner\u2026"),
    /* @__PURE__ */ React.createElement("option", null, "Plans de construction neuve"),
    /* @__PURE__ */ React.createElement("option", null, "Plans d'agrandissement"),
    /* @__PURE__ */ React.createElement("option", null, "Plans de r\xE9novation majeure"),
    /* @__PURE__ */ React.createElement("option", null, "Plans pour permis municipal"),
    /* @__PURE__ */ React.createElement("option", null, "Autre")
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "D\xE9crivez votre projet"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: form.description,
      onChange: update("description"),
      rows: 4,
      placeholder: "Ex. : Agrandissement de 400 pi\xB2 \xE0 l'arri\xE8re d'une r\xE9sidence unifamiliale\u2026",
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Ville"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.ville,
      onChange: update("ville"),
      placeholder: "Ex. : Victoriaville",
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submitRequest,
      disabled: sending,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: sending ? 0.7 : 1 },
      className: "px-6 py-3 rounded-sm font-medium tracking-wide uppercase text-sm flex items-center gap-2 hover:brightness-110 transition"
    },
    sending ? "Envoi en cours\u2026" : "Envoyer la demande",
    " ",
    /* @__PURE__ */ React.createElement(ArrowRight, { size: 16 })
  ), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs mt-2" }, error))))));
}
function CertificationView() {
  const steps = [
    {
      icon: FileCheck2,
      title: "D\xE9p\xF4t du dossier",
      text: "Licence RBQ, preuve d'assurance responsabilit\xE9 et registre des entreprises."
    },
    {
      icon: ShieldCheck,
      title: "V\xE9rification",
      text: "Validation des documents, ant\xE9c\xE9dents et plaintes d\xE9pos\xE9es aupr\xE8s des organismes officiels."
    },
    {
      icon: Ruler,
      title: "\xC9valuation terrain",
      text: "Visite ou entrevue portant sur la qualit\xE9 d'ex\xE9cution et les m\xE9thodes de travail."
    },
    {
      icon: Stamp,
      title: "D\xE9cision de qualification",
      text: "Chaque dossier est \xE9valu\xE9 personnellement : le professionnel est qualifi\xE9 et re\xE7oit son sceau, ou disqualifi\xE9 s'il ne r\xE9pond pas aux crit\xE8res."
    }
  ];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Processus de certification",
      title: "Comment un entrepreneur devient certifi\xE9",
      subtitle: "Chaque professionnel est \xE9valu\xE9 personnellement avant d'obtenir acc\xE8s \xE0 la plateforme."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-0" }, steps.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s.title, className: "flex gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.navy },
      className: "rounded-full w-11 h-11 flex items-center justify-center shrink-0"
    },
    /* @__PURE__ */ React.createElement(s.icon, { size: 18, color: "#fff", strokeWidth: 2 })
  ), i < steps.length - 1 && /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.paperDark }, className: "w-px flex-1 my-1" })), /* @__PURE__ */ React.createElement("div", { className: "pb-10" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { fontFamily: "'IBM Plex Mono', monospace", color: COLORS.steel },
      className: "text-xs mb-1"
    },
    "\xC9tape ",
    i + 1
  ), /* @__PURE__ */ React.createElement(
    "h3",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
      className: "text-lg font-medium mb-1.5"
    },
    s.title
  ), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm max-w-md leading-relaxed" }, s.text))))))));
}
function TrustNetworkView() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "La confiance, dans les deux sens",
      title: "R\xE9seau de confiance",
      subtitle: "Chaque personne est \xE9valu\xE9e personnellement \u2014 pas seulement par un algorithme."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "max-w-2xl mb-10 leading-relaxed" }, "R\xE9no-Confiance n'\xE9value pas seulement les entrepreneurs et architectes \u2014 chaque personne sur la plateforme b\xE2tit une r\xE9putation, particuliers inclus. Chaque dossier est qualifi\xE9 ou disqualifi\xE9 personnellement, pas seulement par un score automatis\xE9."), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-3 gap-5 mb-12" }, /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.orange, borderLeftWidth: 3 }, className: "border rounded-sm p-6" }, /* @__PURE__ */ React.createElement(ClipboardCheck, { size: 20, style: { color: COLORS.orange }, strokeWidth: 2 }), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-medium mt-3 mb-1.5" }, "Avis mutuels"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, "Apr\xE8s chaque projet, le particulier \xE9value le professionnel (qualit\xE9, d\xE9lais, budget, communication) et le professionnel \xE9value le particulier (clart\xE9 du mandat, paiements, acc\xE8s au chantier). Les avis sont publi\xE9s d\xE8s qu'ils sont soumis.")), /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.orange, borderLeftWidth: 3 }, className: "border rounded-sm p-6" }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 20, style: { color: COLORS.orange }, strokeWidth: 2 }), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-medium mt-3 mb-1.5" }, "Score de confiance"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, "Un score sur 100 affich\xE9 sur chaque profil, compos\xE9 des certifications valides, de l'historique d'avis, du taux de projets men\xE9s \xE0 terme et de l'anciennet\xE9 \u2014 toujours d\xE9taill\xE9, jamais opaque.")), /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.orange, borderLeftWidth: 3 }, className: "border rounded-sm p-6" }, /* @__PURE__ */ React.createElement(FileCheck2, { size: 20, style: { color: COLORS.orange }, strokeWidth: 2 }), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-medium mt-3 mb-1.5" }, "Identit\xE9 v\xE9rifi\xE9e"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, "Les particuliers peuvent aussi se faire v\xE9rifier, pour rassurer les professionnels avant m\xEAme de recevoir une offre."))), /* @__PURE__ */ React.createElement(DashedDivider, null), /* @__PURE__ */ React.createElement(
    "h3",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
      className: "text-xl font-semibold mt-10 mb-6"
    },
    "Deux niveaux de v\xE9rification pour les particuliers"
  ), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-sm p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { background: "#E4E6E8", color: "#4B5257" },
      className: "text-[11px] font-medium px-2 py-0.5 rounded-full"
    },
    "V\xC9RIFI\xC9"
  )), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.navy }, className: "text-sm font-medium mb-1" }, "Num\xE9ro de t\xE9l\xE9phone confirm\xE9"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, "\xC9tape rapide, sans friction, activ\xE9e automatiquement \xE0 l'inscription. Le minimum pour soumettre un projet.")), /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.orange, borderWidth: 2 }, className: "border rounded-sm p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      style: { background: "#F4E3C5", color: "#8A6116" },
      className: "text-[11px] font-medium px-2 py-0.5 rounded-full"
    },
    "V\xC9RIFI\xC9+"
  )), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.navy }, className: "text-sm font-medium mb-1" }, "Carte de paiement valid\xE9e"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, "Optionnel, plus rassurant pour les professionnels. Recommand\xE9 pour les projets \xE0 plus gros budget."))))));
}
const PROJECTS = [];
function ShowcaseView() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "R\xE9sultats r\xE9els",
      title: "R\xE9alisations",
      subtitle: "Des projets men\xE9s \xE0 terme sur la plateforme, publi\xE9s avec l'accord du client et du professionnel."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-6" }, PROJECTS.map((p) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: p.id,
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "border rounded-sm overflow-hidden"
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navySoft} 100%)`,
          height: 140
        },
        className: "flex items-center justify-center relative"
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }
        }
      ),
      /* @__PURE__ */ React.createElement(Camera, { size: 26, color: COLORS.orange, strokeWidth: 1.75, className: "relative" }),
      /* @__PURE__ */ React.createElement(
        "span",
        {
          style: { fontFamily: "'IBM Plex Mono', monospace", color: "#ffffff80" },
          className: "absolute bottom-2 right-3 text-[10px] tracking-widest uppercase"
        },
        p.id
      )
    ),
    /* @__PURE__ */ React.createElement("div", { className: "p-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2 mb-1" }, /* @__PURE__ */ React.createElement(
      "h3",
      {
        style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy },
        className: "text-base font-semibold leading-tight"
      },
      p.title
    ), /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { background: "#F4E3C5", color: "#8A6116" },
        className: "text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap"
      },
      p.type
    )), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed mt-2" }, p.caption), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-4 pt-3", style: { borderTop: `1px solid ${COLORS.paperDark}` } }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs", style: { color: COLORS.navy } }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 13, style: { color: COLORS.orange } }), p.pro, " \xB7 ", p.proType), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 text-xs", style: { color: COLORS.steel } }, /* @__PURE__ */ React.createElement(MapPin, { size: 12 }), " ", p.city)))
  )), PROJECTS.length === 0 && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "col-span-2 border rounded-sm p-8 text-center"
    },
    /* @__PURE__ */ React.createElement(Camera, { size: 28, style: { color: COLORS.orange }, className: "mx-auto mb-3" }),
    /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-medium mb-1.5" }, "Aucune r\xE9alisation publi\xE9e pour l'instant"),
    /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm max-w-sm mx-auto" }, "Les premiers projets men\xE9s \xE0 terme sur la plateforme appara\xEEtront ici, avec l'accord du client et du professionnel.")
  )))));
}
const BID_PROJECTS = [
  {
    id: "PRJ-4021",
    type: "Toiture",
    city: "L\xE9vis, QC",
    budget: "8 000 $ \u2013 12 000 $",
    description: "Remplacement complet de toiture, bungalow 1100 pi\xB2.",
    posted: "Il y a 2 jours"
  },
  {
    id: "PRJ-4038",
    type: "R\xE9novation cuisine",
    city: "Saint-Georges, QC",
    budget: "20 000 $ \u2013 30 000 $",
    description: "R\xE9novation compl\xE8te, armoires sur mesure et \xEElot central.",
    posted: "Il y a 1 jour"
  },
  {
    id: "PRJ-4044",
    type: "Fondation",
    city: "Thetford Mines, QC",
    budget: "15 000 $ \u2013 22 000 $",
    description: "R\xE9fection partielle de fondation, infiltration d'eau.",
    posted: "Aujourd'hui"
  }
];
const PLAN_REQUESTS = [
  {
    id: "PLN-2101",
    type: "Plans d'agrandissement",
    city: "L\xE9vis, QC",
    budget: "3 000 $ \u2013 5 000 $",
    description: "Agrandissement de 400 pi\xB2 \xE0 l'arri\xE8re d'une r\xE9sidence unifamiliale.",
    posted: "Il y a 3 jours"
  },
  {
    id: "PLN-2114",
    type: "Plans de construction neuve",
    city: "Saint-Georges, QC",
    budget: "6 000 $ \u2013 9 000 $",
    description: "Plans complets pour une nouvelle r\xE9sidence unifamiliale, 1800 pi\xB2.",
    posted: "Il y a 1 jour"
  },
  {
    id: "PLN-2129",
    type: "Plans pour permis municipal",
    city: "Montmagny, QC",
    budget: "1 500 $ \u2013 2 500 $",
    description: "Plans n\xE9cessaires pour obtenir un permis de r\xE9novation majeure.",
    posted: "Aujourd'hui"
  }
];
const CREDIT_PACKS = [
  { name: "D\xE9part", credits: 20, price: "60 $", note: "Id\xE9al pour tester la plateforme" },
  { name: "Pro", credits: 60, price: "150 $", note: "17 % d'\xE9conomie vs D\xE9part", featured: true },
  { name: "Expert", credits: 150, price: "350 $", note: "22 % d'\xE9conomie vs D\xE9part" }
];
const REGIONS_QC = [
  "Abitibi-T\xE9miscamingue",
  "Bas-Saint-Laurent",
  "Capitale-Nationale",
  "Centre-du-Qu\xE9bec",
  "Chaudi\xE8re-Appalaches",
  "C\xF4te-Nord",
  "Estrie",
  "Gasp\xE9sie\u2013\xCEles-de-la-Madeleine",
  "Lanaudi\xE8re",
  "Laurentides",
  "Laval",
  "Mauricie",
  "Mont\xE9r\xE9gie",
  "Montr\xE9al",
  "Nord-du-Qu\xE9bec",
  "Outaouais",
  "Saguenay\u2013Lac-Saint-Jean"
];
const BUDGET_TOKEN_TIERS = [
  { max: 5e3, jetons: 3 },
  { max: 1e4, jetons: 5 },
  { max: 15e3, jetons: 10 },
  { max: 25e3, jetons: 15 },
  { max: 5e4, jetons: 25 },
  { max: 1e5, jetons: 40 },
  { max: Infinity, jetons: 60 }
];
const LEVEL_TOKEN_MULTIPLIER = { Or: 1, Argent: 1.5, Bronze: 2 };
function budgetToBaseTokens(budgetStr) {
  const numbers = (budgetStr.match(/[\d\s]+(?=\s?\$)/g) || []).map((n) => parseInt(n.replace(/\s/g, ""), 10)).filter((n) => !isNaN(n));
  const max = numbers.length ? Math.max(...numbers) : 0;
  const tier = BUDGET_TOKEN_TIERS.find((t) => max <= t.max);
  return tier ? tier.jetons : BUDGET_TOKEN_TIERS[BUDGET_TOKEN_TIERS.length - 1].jetons;
}
function bidCost(level, budgetStr) {
  const base = budgetToBaseTokens(budgetStr);
  const mult = LEVEL_TOKEN_MULTIPLIER[level] || 1;
  return Math.ceil(base * mult);
}
function JoinView({ goTo }) {
  const [form, setForm] = useState({
    entreprise: "",
    contact: "",
    courriel: "",
    telephone: "",
    profession: "",
    specialite: "",
    region: "",
    ville: "",
    numero: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const inputStyle = "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition";
  const submitApplication = async () => {
    setError("");
    setSending(true);
    try {
      const { error: dbError } = await supabase.from("professionals").insert({
        entreprise: form.entreprise,
        contact: form.contact,
        courriel: form.courriel,
        telephone: form.telephone,
        profession: form.profession,
        specialite: form.specialite,
        region: form.region,
        ville: form.ville,
        numero_rbq_oaq: form.numero,
        statut: "en_attente"
      });
      if (dbError) throw new Error("\xC9chec de l'enregistrement");
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ formulaire: "Demande de certification (partenaire)", ...form })
        });
      } catch (e) {
      }
      setSubmitted(true);
    } catch (e) {
      setError(
        "L'envoi a \xE9chou\xE9. V\xE9rifie que SUPABASE_URL / SUPABASE_ANON_KEY sont bien configur\xE9s en haut du fichier."
      );
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Rejoindre le r\xE9seau",
      title: "Devenir partenaire certifi\xE9",
      subtitle: "Entrepreneur ou architecte : d\xE9pose ta candidature. Chaque dossier est \xE9valu\xE9 personnellement."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-2xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { style: { background: "#F4E3C5", borderColor: "#D9B45F" }, className: "border rounded-sm px-4 py-3 mb-6 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 15, style: { color: "#8A6116" }, className: "shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("p", { style: { color: "#8A6116" }, className: "text-xs leading-relaxed" }, /* @__PURE__ */ React.createElement("strong", null, "Offre de lancement \u2014 Membres fondateurs :"), " les premiers professionnels qualifi\xE9s re\xE7oivent 15 cr\xE9dits gratuits pour commencer \xE0 miser sur des projets, sans premier achat requis.")), submitted ? /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "border rounded-sm p-8 text-center"
    },
    /* @__PURE__ */ React.createElement(CheckCircle2, { size: 40, style: { color: COLORS.green }, className: "mx-auto mb-4" }),
    /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-xl font-semibold mb-2" }, "Candidature re\xE7ue"),
    /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed mb-5" }, "Ton dossier sera \xE9valu\xE9 personnellement. On te recontacte par courriel pour la suite du processus de certification."),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goTo && goTo("espacepro"),
        style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
        className: "px-5 py-2.5 rounded-md text-sm font-medium"
      },
      "Cr\xE9er mon compte d\xE8s maintenant"
    )
  ) : /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Type de profil"), /* @__PURE__ */ React.createElement("select", { value: form.profession, onChange: update("profession"), style: { borderColor: COLORS.paperDark }, className: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "S\xE9lectionner\u2026"), /* @__PURE__ */ React.createElement("option", null, "Entrepreneur"), /* @__PURE__ */ React.createElement("option", null, "Architecte"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Sp\xE9cialit\xE9"), /* @__PURE__ */ React.createElement("input", { value: form.specialite, onChange: update("specialite"), placeholder: "Ex. : Toiture, r\xE9novation g\xE9n\xE9rale\u2026", style: { borderColor: COLORS.paperDark }, className: inputStyle }))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Nom de l'entreprise"), /* @__PURE__ */ React.createElement("input", { value: form.entreprise, onChange: update("entreprise"), style: { borderColor: COLORS.paperDark }, className: inputStyle })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Num\xE9ro RBQ / OAQ"), /* @__PURE__ */ React.createElement("input", { value: form.numero, onChange: update("numero"), style: { borderColor: COLORS.paperDark }, className: inputStyle }))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Nom du contact"), /* @__PURE__ */ React.createElement("input", { value: form.contact, onChange: update("contact"), style: { borderColor: COLORS.paperDark }, className: inputStyle })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Ville"), /* @__PURE__ */ React.createElement("input", { value: form.ville, onChange: update("ville"), style: { borderColor: COLORS.paperDark }, className: inputStyle }))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "R\xE9gion"), /* @__PURE__ */ React.createElement("select", { value: form.region, onChange: update("region"), style: { borderColor: COLORS.paperDark }, className: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "S\xE9lectionner\u2026"), REGIONS_QC.map((r) => /* @__PURE__ */ React.createElement("option", { key: r }, r)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Courriel"), /* @__PURE__ */ React.createElement("input", { value: form.courriel, onChange: update("courriel"), type: "email", style: { borderColor: COLORS.paperDark }, className: inputStyle }))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "T\xE9l\xE9phone"), /* @__PURE__ */ React.createElement("input", { value: form.telephone, onChange: update("telephone"), type: "tel", style: { borderColor: COLORS.paperDark }, className: inputStyle }))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submitApplication,
      disabled: sending,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: sending ? 0.7 : 1 },
      className: "px-6 py-3 rounded-sm font-medium tracking-wide uppercase text-sm flex items-center gap-2 hover:brightness-110 transition"
    },
    sending ? "Envoi en cours\u2026" : "Envoyer ma candidature",
    " ",
    /* @__PURE__ */ React.createElement(ArrowRight, { size: 16 })
  ), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs mt-2" }, error)))));
}
function EspaceProView() {
  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [professional, setProfessional] = useState(null);
  const [profLoading, setProfLoading] = useState(false);
  const [profileType, setProfileType] = useState("Entrepreneur");
  const [listing, setListing] = useState([]);
  const [bidsOn, setBidsOn] = useState([]);
  const [error, setError] = useState("");
  const [sendingId, setSendingId] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session) {
      setProfessional(null);
      return;
    }
    setProfLoading(true);
    supabase.from("professionals").select("*").eq("auth_user_id", session.user.id).maybeSingle().then(({ data }) => {
      setProfessional(data);
      if (data) setProfileType(data.profession === "Architecte" ? "Architecte" : "Entrepreneur");
      setProfLoading(false);
    });
  }, [session]);
  useEffect(() => {
    if (!professional || professional.statut !== "qualifie") return;
    const categorie = profileType === "Architecte" ? "plans" : "construction";
    supabase.from("projects").select("*").eq("categorie", categorie).eq("statut", "en_attente").order("created_at", { ascending: false }).then(({ data }) => setListing(data || []));
    supabase.from("bids").select("project_id").eq("professional_id", professional.id).then(({ data }) => setBidsOn((data || []).map((b) => b.project_id)));
  }, [professional, profileType]);
  const handleAuth = async () => {
    setAuthError("");
    setAuthLoading(true);
    const fn = authMode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { data, error: error2 } = await fn({ email: authEmail, password: authPassword });
    if (error2) setAuthError(error2.message);
    else if (authMode === "signup" && data && !data.session) {
      setAuthError("Compte cr\xE9\xE9 \u2014 v\xE9rifie ta bo\xEEte courriel pour confirmer ton adresse, puis reviens te connecter.");
    }
    setAuthLoading(false);
  };
  const placeBid = async (p) => {
    const cost = bidCost(professional.niveau, p.budget);
    if (bidsOn.includes(p.id) || professional.credits < cost) return;
    setError("");
    setSendingId(p.id);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      const res = await fetch(`${SUPABASE_URL}/functions/v1/place-bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ projectId: p.id })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "\xC9chec de la mise");
      setProfessional((pr) => ({ ...pr, credits: result.remaining }));
      setBidsOn((b) => [...b, p.id]);
    } catch (e) {
      setError(e.message || "L'envoi de ta mise a \xE9chou\xE9, r\xE9essaie dans un instant.");
    } finally {
      setSendingId(null);
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Espace professionnel",
      title: "Projets disponibles",
      subtitle: "Entrepreneurs et architectes : connecte-toi pour miser sur les projets qui correspondent \xE0 ton expertise."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto" }, !session && /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-sm p-8 max-w-md mx-auto" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-lg font-semibold mb-1" }, authMode === "login" ? "Connexion" : "Cr\xE9er un compte"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-5" }, "R\xE9serv\xE9 aux entrepreneurs et architectes ayant pos\xE9 leur candidature via \xAB Devenir partenaire \xBB."), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: authEmail,
      onChange: (e) => setAuthEmail(e.target.value),
      type: "email",
      placeholder: "Courriel",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: authPassword,
      onChange: (e) => setAuthPassword(e.target.value),
      type: "password",
      placeholder: "Mot de passe",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleAuth,
      disabled: authLoading,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: authLoading ? 0.7 : 1 },
      className: "w-full px-4 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide"
    },
    authLoading ? "Un instant\u2026" : authMode === "login" ? "Se connecter" : "Cr\xE9er mon compte"
  ), authError && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs" }, authError), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setAuthMode(authMode === "login" ? "signup" : "login"),
      style: { color: COLORS.steel },
      className: "text-xs underline block mx-auto"
    },
    authMode === "login" ? "Pas encore de compte ? Cr\xE9er un mot de passe" : "D\xE9j\xE0 un compte ? Se connecter"
  ))), session && profLoading && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm" }, "Chargement de ton profil\u2026"), session && !profLoading && !professional && /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-sm p-8 max-w-md mx-auto text-center" }, /* @__PURE__ */ React.createElement(Lock, { size: 24, style: { color: COLORS.orange }, className: "mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-medium mb-1.5" }, "Aucune candidature associ\xE9e"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm" }, "D\xE9pose d'abord ta candidature dans l'onglet \xAB Devenir partenaire \xBB avec ce m\xEAme courriel.")), session && professional && professional.statut !== "qualifie" && /* @__PURE__ */ React.createElement("div", { style: { background: "#F4E3C5", borderColor: "#D9B45F" }, className: "border rounded-sm p-8 max-w-md mx-auto text-center" }, /* @__PURE__ */ React.createElement(ClipboardCheck, { size: 24, style: { color: "#8A6116" }, className: "mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: "#8A6116" }, className: "text-base font-medium mb-1.5" }, "Candidature en \xE9valuation"), /* @__PURE__ */ React.createElement("p", { style: { color: "#8A6116" }, className: "text-sm" }, "Ton dossier sera examin\xE9 personnellement avant de te donner acc\xE8s aux projets.")), session && professional && professional.statut === "qualifie" && /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-[220px_1fr] gap-6" }, /* @__PURE__ */ React.createElement("aside", { style: { background: COLORS.navy }, className: "rounded-lg p-3 flex flex-wrap md:flex-col gap-1 h-fit" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 px-2 pb-3 mb-1 border-b border-white/10" }, /* @__PURE__ */ React.createElement(BrandMark, { size: 26 }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Poppins', sans-serif", color: "#fff" }, className: "text-xs font-semibold" }, "R\xC9NO-CONFIANCE")), [
    { icon: LayoutDashboard, label: "Tableau de bord", active: true },
    { icon: ClipboardList, label: "Projets disponibles" },
    { icon: Coins, label: "Mes cr\xE9dits" },
    { icon: UserCircle, label: "Mon profil" }
  ].map((it) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: it.label,
      style: {
        background: it.active ? COLORS.orange : "transparent",
        color: it.active ? COLORS.navy : "#ffffffb0",
        fontFamily: "'Poppins', sans-serif"
      },
      className: "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium cursor-default"
    },
    /* @__PURE__ */ React.createElement(it.icon, { size: 14 }),
    " ",
    it.label
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => supabase.auth.signOut(),
      style: { color: "#ffffffb0", fontFamily: "'Poppins', sans-serif" },
      className: "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium mt-2 md:mt-auto hover:text-white"
    },
    /* @__PURE__ */ React.createElement(LogOut, { size: 14 }),
    " Se d\xE9connecter"
  )), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mb-4" }, ["Entrepreneur", "Architecte"].map((pt) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: pt,
      onClick: () => setProfileType(pt),
      style: {
        fontFamily: "'Poppins', sans-serif",
        background: profileType === pt ? COLORS.navy : "transparent",
        color: profileType === pt ? "#fff" : COLORS.navy,
        borderColor: COLORS.navy
      },
      className: "px-4 py-2 rounded-sm text-sm font-medium uppercase tracking-wide border"
    },
    pt
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-3 gap-4 mb-6" }, /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-2xl font-bold leading-none mb-1" }, professional.credits), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-xs" }, "Cr\xE9dits disponibles")), /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-2xl font-bold leading-none mb-1" }, bidsOn.length), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-xs" }, "Soumissions en cours")), /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-2xl font-bold leading-none mb-1" }, listing.length), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-xs" }, "Projets consult\xE9s"))), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-xs mb-4" }, "Niveau ", professional.niveau, " \xB7 co\xFBt variable selon le budget du projet"), /* @__PURE__ */ React.createElement("div", { style: { background: "#F4E3C5", borderColor: "#D9B45F" }, className: "border rounded-sm px-4 py-3 mb-6 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(Lock, { size: 15, style: { color: "#8A6116" }, className: "shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("p", { style: { color: "#8A6116" }, className: "text-xs leading-relaxed" }, "Coordonn\xE9es du client prot\xE9g\xE9es : vous voyez seulement la ville, le type de travaux et l'estim\xE9 de budget. Le nom, l'adresse exacte et les coordonn\xE9es ne sont d\xE9voil\xE9s qu'une fois votre mise accept\xE9e.")), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs mb-4" }, error), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold mb-3" }, "Projets disponibles pour vous"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 mb-14" }, listing.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm" }, "Aucun projet disponible dans cette cat\xE9gorie pour l'instant."), listing.map((p) => {
    const already = bidsOn.includes(p.id);
    const cost = bidCost(professional.niveau, p.budget);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: p.id,
        style: { background: COLORS.card, borderColor: COLORS.paperDark, borderLeftColor: COLORS.orange, borderLeftWidth: 3 },
        className: "border rounded-lg p-5 flex flex-wrap items-center justify-between gap-4"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-[220px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-semibold" }, p.type)), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-2" }, p.description), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-4 text-xs", style: { color: COLORS.navy } }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(MapPin, { size: 12 }), " ", p.ville, ", ", p.region), /* @__PURE__ */ React.createElement("span", null, p.budget))),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => placeBid(p),
          disabled: already || professional.credits < cost || sendingId === p.id,
          style: {
            background: already ? COLORS.green : professional.credits < cost ? COLORS.paperDark : COLORS.orange,
            color: already ? "#fff" : COLORS.navy,
            fontFamily: "'Poppins', sans-serif",
            cursor: already || professional.credits < cost ? "default" : "pointer",
            opacity: sendingId === p.id ? 0.7 : 1
          },
          className: "px-4 py-2.5 rounded-md text-sm font-medium uppercase tracking-wide whitespace-nowrap flex items-center gap-2"
        },
        already ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CheckCircle2, { size: 15 }), " Mise envoy\xE9e") : sendingId === p.id ? "Envoi\u2026" : /* @__PURE__ */ React.createElement(React.Fragment, null, "Miser \xB7 ", cost, " cr\xE9dit", cost > 1 ? "s" : "")
      )
    );
  })))), /* @__PURE__ */ React.createElement(DashedDivider, null), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-xl font-semibold mt-10 mb-2" }, "Forfaits de cr\xE9dits"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-6 max-w-xl" }, "Plus votre niveau de certification est \xE9lev\xE9, moins vos mises co\xFBtent de cr\xE9dits."), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-3 gap-5" }, CREDIT_PACKS.map((pack) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: pack.name,
      style: {
        background: pack.featured ? COLORS.navy : COLORS.card,
        borderColor: pack.featured ? COLORS.orange : COLORS.paperDark,
        borderWidth: pack.featured ? 2 : 1
      },
      className: "border rounded-sm p-6"
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: { fontFamily: "'IBM Plex Mono', monospace", color: pack.featured ? COLORS.orange : COLORS.steel },
        className: "text-xs tracking-widest uppercase mb-2"
      },
      pack.name
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: { fontFamily: "'Poppins', sans-serif", color: pack.featured ? "#fff" : COLORS.navy },
        className: "text-3xl font-semibold mb-1"
      },
      pack.price
    ),
    /* @__PURE__ */ React.createElement("div", { style: { color: pack.featured ? "#ffffffaa" : COLORS.steel }, className: "text-sm mb-4" }, pack.credits, " cr\xE9dits"),
    /* @__PURE__ */ React.createElement("p", { style: { color: pack.featured ? "#ffffff90" : COLORS.steel }, className: "text-xs leading-relaxed mb-4" }, pack.note),
    /* @__PURE__ */ React.createElement(
      "a",
      {
        href: STRIPE_LINKS[pack.name],
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          background: pack.featured ? COLORS.orange : COLORS.navy,
          color: pack.featured ? COLORS.navy : "#fff",
          fontFamily: "'Poppins', sans-serif"
        },
        className: "block text-center px-4 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide hover:brightness-110 transition"
      },
      "Acheter"
    )
  ))))));
}
function ClientDashboardView() {
  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session) return;
    supabase.from("projects").select("*").eq("client_user_id", session.user.id).order("created_at", { ascending: false }).then(({ data }) => setProjects(data || []));
  }, [session]);
  const handleAuth = async () => {
    setAuthError("");
    setAuthLoading(true);
    const fn = authMode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { data, error } = await fn({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    else if (authMode === "signup" && data && !data.session) {
      setAuthError("Compte cr\xE9\xE9 \u2014 v\xE9rifie ta bo\xEEte courriel pour confirmer ton adresse, puis reviens te connecter.");
    }
    setAuthLoading(false);
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Espace client",
      title: "Tableau de bord",
      subtitle: "Connecte-toi pour suivre l'avancement de tes projets et voir les soumissions re\xE7ues."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto" }, !session && /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-sm p-8 max-w-md mx-auto" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-lg font-semibold mb-1" }, authMode === "login" ? "Connexion" : "Cr\xE9er un compte"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-5" }, "Utilise le m\xEAme courriel que lors de la soumission de ton projet."), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: authEmail,
      onChange: (e) => setAuthEmail(e.target.value),
      type: "email",
      placeholder: "Courriel",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: authPassword,
      onChange: (e) => setAuthPassword(e.target.value),
      type: "password",
      placeholder: "Mot de passe",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleAuth,
      disabled: authLoading,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: authLoading ? 0.7 : 1 },
      className: "w-full px-4 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide"
    },
    authLoading ? "Un instant\u2026" : authMode === "login" ? "Se connecter" : "Cr\xE9er mon compte"
  ), authError && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs" }, authError), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setAuthMode(authMode === "login" ? "signup" : "login"),
      style: { color: COLORS.steel },
      className: "text-xs underline block mx-auto"
    },
    authMode === "login" ? "Pas encore de compte ? Cr\xE9er un mot de passe" : "D\xE9j\xE0 un compte ? Se connecter"
  ))), session && /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-[220px_1fr] gap-6" }, /* @__PURE__ */ React.createElement(
    DashSidebar,
    {
      onSignOut: () => supabase.auth.signOut(),
      items: [
        { icon: LayoutDashboard, label: "Tableau de bord", active: true },
        { icon: FolderKanban, label: "Mes projets" },
        { icon: FileText, label: "Soumissions re\xE7ues" },
        { icon: MessageSquare, label: "Messages" },
        { icon: UserCircle, label: "Mon profil" }
      ]
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold" }, "Mes projets"), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.steel }, className: "text-xs" }, session.user.email)), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, projects.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm" }, "Aucun projet associ\xE9 \xE0 ce compte pour l'instant. Soumets un projet avec ce m\xEAme courriel pour le voir appara\xEEtre ici."), projects.map((p) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: p.id,
      style: { background: COLORS.card, borderColor: COLORS.paperDark },
      className: "border rounded-lg p-4 flex flex-wrap items-center justify-between gap-3"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold" }, p.type), /* @__PURE__ */ React.createElement(StatusTag, { statut: p.statut })), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-xs" }, p.ville, ", ", p.region)),
    /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.steel }, className: "text-xs" }, p.budget)
  ))))))));
}
function AdminDashboardView() {
  const [session, setSession] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [pros, setPros] = useState([]);
  const [projects, setProjects] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [adminTab, setAdminTab] = useState("overview");
  const [crmDrafts, setCrmDrafts] = useState({});
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);
  const isAdmin = session && session.user.email === ADMIN_EMAIL;
  const loadData = () => {
    supabase.from("professionals").select("*").order("created_at", { ascending: false }).then(({ data }) => setPros(data || []));
    supabase.from("projects").select("*").order("created_at", { ascending: false }).then(({ data }) => setProjects(data || []));
  };
  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);
  const handleAuth = async () => {
    setAuthError("");
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };
  const FOUNDING_MEMBER_CREDITS = 15;
  const setProStatut = async (id, statut) => {
    setBusyId(id);
    const update = { statut };
    if (statut === "qualifie") update.credits = FOUNDING_MEMBER_CREDITS;
    await supabase.from("professionals").update(update).eq("id", id);
    loadData();
    setBusyId(null);
  };
  const publishProject = async (id) => {
    setBusyId(id);
    await supabase.from("projects").update({ statut: "publie" }).eq("id", id);
    loadData();
    setBusyId(null);
  };
  const draftFor = (table, id, field, fallback) => {
    const key = `${table}-${id}`;
    if (crmDrafts[key] && crmDrafts[key][field] !== void 0) return crmDrafts[key][field];
    return fallback || "";
  };
  const updateDraft = (table, id, field, value) => {
    const key = `${table}-${id}`;
    setCrmDrafts((d) => ({ ...d, [key]: { ...d[key], [field]: value } }));
  };
  const saveCrm = async (table, id) => {
    const key = `${table}-${id}`;
    const draft = crmDrafts[key];
    if (!draft) return;
    setBusyId(id);
    await supabase.from(table).update({
      notes: draft.notes,
      prochain_suivi: draft.prochain_suivi || null,
      dernier_contact: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    }).eq("id", id);
    loadData();
    setCrmDrafts((d) => {
      const copy = { ...d };
      delete copy[key];
      return copy;
    });
    setBusyId(null);
  };
  const pending = pros.filter((p) => p.statut === "en_attente").length;
  const pendingProjects = projects.filter((p) => p.statut === "en_attente").length;
  const published = projects.filter((p) => p.statut === "publie").length;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SectionBand, { eyebrow: "Acc\xE8s restreint", title: "Administration", subtitle: "Qualifie les professionnels et g\xE8re les projets soumis." }), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto" }, !session && /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-sm p-8 max-w-md mx-auto" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-lg font-semibold mb-4" }, "Connexion administrateur"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: authEmail,
      onChange: (e) => setAuthEmail(e.target.value),
      type: "email",
      placeholder: "Courriel",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: authPassword,
      onChange: (e) => setAuthPassword(e.target.value),
      type: "password",
      placeholder: "Mot de passe",
      style: { borderColor: COLORS.paperDark },
      className: "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleAuth,
      disabled: authLoading,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: authLoading ? 0.7 : 1 },
      className: "w-full px-4 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide"
    },
    authLoading ? "Un instant\u2026" : "Se connecter"
  ), authError && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs" }, authError))), session && !isAdmin && /* @__PURE__ */ React.createElement("div", { style: { background: "#F4E3C5", borderColor: "#D9B45F" }, className: "border rounded-sm p-8 max-w-md mx-auto text-center" }, /* @__PURE__ */ React.createElement(Lock, { size: 24, style: { color: "#8A6116" }, className: "mx-auto mb-3" }), /* @__PURE__ */ React.createElement("p", { style: { color: "#8A6116" }, className: "text-sm" }, "Ce compte n'a pas acc\xE8s \xE0 l'administration.")), isAdmin && /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-[220px_1fr] gap-6" }, /* @__PURE__ */ React.createElement(
    DashSidebar,
    {
      onSignOut: () => supabase.auth.signOut(),
      items: [
        { icon: LayoutDashboard, label: "Tableau de bord", active: adminTab === "overview", onClick: () => setAdminTab("overview") },
        { icon: ClipboardCheck, label: "Suivi (CRM)", active: adminTab === "crm", onClick: () => setAdminTab("crm") }
      ]
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, adminTab === "overview" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-4 gap-4 mb-8" }, /* @__PURE__ */ React.createElement(StatCard, { value: pendingProjects, label: "Projets en attente" }), /* @__PURE__ */ React.createElement(StatCard, { value: pending, label: "Entrepreneurs en attente" }), /* @__PURE__ */ React.createElement(StatCard, { value: published, label: "Projets publi\xE9s" }), /* @__PURE__ */ React.createElement(StatCard, { value: pros.length, label: "Professionnels au total" })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold mb-3" }, "Professionnels \xE0 qualifier"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-10" }, pros.filter((p) => p.statut === "en_attente").length === 0 && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm" }, "Aucune candidature en attente."), pros.filter((p) => p.statut === "en_attente").map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4 flex flex-wrap items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold" }, p.entreprise, " ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.steel, fontWeight: 400 } }, "\xB7 ", p.profession)), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-xs" }, p.specialite, " \xB7 ", p.ville, ", ", p.region, " \xB7 ", p.courriel)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: busyId === p.id,
      onClick: () => setProStatut(p.id, "qualifie"),
      style: { background: COLORS.green, color: "#fff", fontFamily: "'Poppins', sans-serif" },
      className: "px-3 py-1.5 rounded-md text-xs font-medium"
    },
    "Qualifier"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: busyId === p.id,
      onClick: () => setProStatut(p.id, "disqualifie"),
      style: { background: "#B33A3A", color: "#fff", fontFamily: "'Poppins', sans-serif" },
      className: "px-3 py-1.5 rounded-md text-xs font-medium"
    },
    "Disqualifier"
  ))))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold mb-3" }, "Projets r\xE9cents"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, projects.slice(0, 8).map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4 flex flex-wrap items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold" }, p.type), /* @__PURE__ */ React.createElement(StatusTag, { statut: p.statut })), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-xs" }, p.ville, ", ", p.region)), p.statut === "en_attente" && /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: busyId === p.id,
      onClick: () => publishProject(p.id),
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
      className: "px-3 py-1.5 rounded-md text-xs font-medium"
    },
    "Publier"
  ))))), adminTab === "crm" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-lg font-semibold mb-1" }, "Suivi des professionnels"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-4" }, "Ajoute une note et une date de prochain suivi pour chaque professionnel."), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-12" }, pros.map((p) => {
    const key = `professionals-${p.id}`;
    const dirty = !!crmDrafts[key];
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold" }, p.entreprise, " ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.steel, fontWeight: 400 } }, "\xB7 ", p.courriel)), /* @__PURE__ */ React.createElement(
      "span",
      {
        style: {
          background: p.statut === "qualifie" ? "#DCEEE3" : p.statut === "disqualifie" ? "#F4D4D4" : "#F4E3C5",
          color: p.statut === "qualifie" ? "#1F6B45" : p.statut === "disqualifie" ? "#8A2020" : "#8A6116"
        },
        className: "text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
      },
      p.statut === "qualifie" ? "Qualifi\xE9" : p.statut === "disqualifie" ? "Disqualifi\xE9" : "En attente"
    )), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-[1fr_180px] gap-3" }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: draftFor("professionals", p.id, "notes", p.notes),
        onChange: (e) => updateDraft("professionals", p.id, "notes", e.target.value),
        placeholder: "Notes de suivi\u2026",
        rows: 2,
        style: { borderColor: COLORS.paperDark },
        className: "w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 transition"
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.steel }, className: "text-xs block mb-1" }, "Prochain suivi"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: draftFor("professionals", p.id, "prochain_suivi", p.prochain_suivi),
        onChange: (e) => updateDraft("professionals", p.id, "prochain_suivi", e.target.value),
        style: { borderColor: COLORS.paperDark },
        className: "w-full border rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 transition"
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-2" }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.steel }, className: "text-[11px]" }, p.dernier_contact ? `Dernier contact : ${p.dernier_contact}` : "Aucun contact enregistr\xE9"), /* @__PURE__ */ React.createElement(
      "button",
      {
        disabled: !dirty || busyId === p.id,
        onClick: () => saveCrm("professionals", p.id),
        style: {
          background: dirty ? COLORS.orange : COLORS.paperDark,
          color: dirty ? COLORS.navy : COLORS.steel,
          fontFamily: "'Poppins', sans-serif"
        },
        className: "px-3 py-1.5 rounded-md text-xs font-medium"
      },
      busyId === p.id ? "Enregistrement\u2026" : "Enregistrer"
    )));
  }), pros.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm" }, "Aucun professionnel pour l'instant.")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-lg font-semibold mb-1" }, "Suivi des clients"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm mb-4" }, "Ajoute une note et une date de prochain suivi pour chaque projet soumis."), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, projects.map((p) => {
    const key = `projects-${p.id}`;
    const dirty = !!crmDrafts[key];
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold" }, p.type, " ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.steel, fontWeight: 400 } }, "\xB7 ", p.ville, ", ", p.region)), /* @__PURE__ */ React.createElement(StatusTag, { statut: p.statut })), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-[1fr_180px] gap-3" }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: draftFor("projects", p.id, "notes", p.notes),
        onChange: (e) => updateDraft("projects", p.id, "notes", e.target.value),
        placeholder: "Notes de suivi\u2026",
        rows: 2,
        style: { borderColor: COLORS.paperDark },
        className: "w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 transition"
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.steel }, className: "text-xs block mb-1" }, "Prochain suivi"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: draftFor("projects", p.id, "prochain_suivi", p.prochain_suivi),
        onChange: (e) => updateDraft("projects", p.id, "prochain_suivi", e.target.value),
        style: { borderColor: COLORS.paperDark },
        className: "w-full border rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 transition"
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-2" }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.steel }, className: "text-[11px]" }, p.dernier_contact ? `Dernier contact : ${p.dernier_contact}` : "Aucun contact enregistr\xE9"), /* @__PURE__ */ React.createElement(
      "button",
      {
        disabled: !dirty || busyId === p.id,
        onClick: () => saveCrm("projects", p.id),
        style: {
          background: dirty ? COLORS.orange : COLORS.paperDark,
          color: dirty ? COLORS.navy : COLORS.steel,
          fontFamily: "'Poppins', sans-serif"
        },
        className: "px-3 py-1.5 rounded-md text-xs font-medium"
      },
      busyId === p.id ? "Enregistrement\u2026" : "Enregistrer"
    )));
  }), projects.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm" }, "Aucun projet pour l'instant."))))))));
}
function BookingView() {
  useEffect(() => {
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Parlons de ton projet",
      title: "R\xE9server un appel",
      subtitle: "Choisis un moment qui te convient \u2014 on en discute directement, sans engagement."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "calendly-inline-widget",
      "data-url": CALENDLY_URL,
      style: { minWidth: "320px", height: "700px" }
    }
  ))));
}
function MaterialsView() {
  const [form, setForm] = useState({ materiaux: "", region: "", ville: "", courriel: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const inputStyle = "w-full border rounded-sm px-3.5 py-2.5 text-sm outline-none focus:ring-2 transition";
  const submitMaterials = async () => {
    setError("");
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ formulaire: "Estimation de mat\xE9riaux", ...form })
      });
      if (!res.ok) throw new Error("Envoi refus\xE9");
      setSubmitted(true);
    } catch (e) {
      setError("L'envoi a \xE9chou\xE9, r\xE9essaie dans un instant.");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Estimation de mat\xE9riaux",
      title: "Faites \xE9valuer le prix de vos mat\xE9riaux",
      subtitle: "D\xE9crivez les mat\xE9riaux dont vous avez besoin \u2014 on transmet ta demande aux quincailleries de ta r\xE9gion. Contrairement \xE0 la recherche d'un entrepreneur, ce service n'est pas gratuit."
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-2xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { style: { background: "#F4E3C5", borderColor: "#D9B45F" }, className: "border rounded-sm px-4 py-3 mb-6 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement(Lock, { size: 15, style: { color: "#8A6116" }, className: "shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("p", { style: { color: "#8A6116" }, className: "text-xs leading-relaxed" }, "Ce service comporte des frais (contrairement \xE0 la mise en relation avec un entrepreneur, qui reste gratuite). Les d\xE9tails te seront communiqu\xE9s avant toute confirmation.")), submitted ? /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-sm p-8 text-center" }, /* @__PURE__ */ React.createElement(CheckCircle2, { size: 40, style: { color: COLORS.green }, className: "mx-auto mb-4" }), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-xl font-semibold mb-2" }, "Demande envoy\xE9e"), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, "On transmet ta liste aux quincailleries de ta r\xE9gion et on te revient avec des prix.")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Liste de mat\xE9riaux souhait\xE9s"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: form.materiaux,
      onChange: update("materiaux"),
      rows: 5,
      placeholder: "Ex. : 20 feuilles de contreplaqu\xE9 4x8, 200 pi\xB2 de bardeaux d'asphalte, 50 pieds de 2x4\u2026",
      style: { borderColor: COLORS.paperDark },
      className: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid sm:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "R\xE9gion"), /* @__PURE__ */ React.createElement("select", { value: form.region, onChange: update("region"), style: { borderColor: COLORS.paperDark }, className: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "S\xE9lectionner\u2026"), REGIONS_QC.map((r) => /* @__PURE__ */ React.createElement("option", { key: r }, r)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Ville"), /* @__PURE__ */ React.createElement("input", { value: form.ville, onChange: update("ville"), style: { borderColor: COLORS.paperDark }, className: inputStyle }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { color: COLORS.navy }, className: "text-sm font-medium block mb-1.5" }, "Ton courriel"), /* @__PURE__ */ React.createElement("input", { value: form.courriel, onChange: update("courriel"), type: "email", style: { borderColor: COLORS.paperDark }, className: inputStyle })), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submitMaterials,
      disabled: sending,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: sending ? 0.7 : 1 },
      className: "px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2"
    },
    sending ? "Envoi en cours\u2026" : "Envoyer ma demande",
    " ",
    /* @__PURE__ */ React.createElement(ArrowRight, { size: 16 })
  ), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#B33A3A" }, className: "text-xs mt-2" }, error)))));
}
function TermsView() {
  const Section = ({ title, children }) => /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-semibold mb-2" }, title), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed space-y-2" }, children));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Document l\xE9gal",
      title: "Conditions d'utilisation",
      subtitle: "Derni\xE8re mise \xE0 jour : juillet 2026"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto" }, /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed mb-8" }, "En utilisant le site R\xE9no-Confiance (renoconfiance.com), vous acceptez les conditions suivantes. Si vous n'\xEAtes pas d'accord avec l'une d'elles, veuillez ne pas utiliser la plateforme."), /* @__PURE__ */ React.createElement(Section, { title: "1. Nature de la plateforme" }, /* @__PURE__ */ React.createElement("p", null, "R\xE9no-Confiance est un service de ", /* @__PURE__ */ React.createElement("strong", null, "mise en relation"), " entre des propri\xE9taires ayant des projets de construction ou de r\xE9novation, et des entrepreneurs et architectes \xE9valu\xE9s personnellement. R\xE9no-Confiance", " ", /* @__PURE__ */ React.createElement("strong", null, "n'est pas une entreprise de construction"), ", n'ex\xE9cute aucun travail, et n'est pas partie aux contrats conclus entre un client et un professionnel.")), /* @__PURE__ */ React.createElement(Section, { title: "2. \xC9valuation des professionnels" }, /* @__PURE__ */ React.createElement("p", null, "Chaque professionnel est \xE9valu\xE9 personnellement avant d'obtenir un sceau de certification (licence RBQ ou membership OAQ, preuve d'assurance, ant\xE9c\xE9dents). Cette \xE9valuation vise \xE0 r\xE9duire les risques, mais ne constitue", " ", /* @__PURE__ */ React.createElement("strong", null, "ni une garantie"), " de la qualit\xE9 du travail ex\xE9cut\xE9, ni une assurance contre les litiges, retards ou insatisfactions pouvant survenir dans le cadre d'un projet.")), /* @__PURE__ */ React.createElement(Section, { title: "3. Responsabilit\xE9" }, /* @__PURE__ */ React.createElement("p", null, "R\xE9no-Confiance n'est pas responsable :"), /* @__PURE__ */ React.createElement("ul", { className: "list-disc pl-5 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "De la qualit\xE9, des d\xE9lais ou du co\xFBt final des travaux ex\xE9cut\xE9s"), /* @__PURE__ */ React.createElement("li", null, "Des dommages, pertes ou litiges d\xE9coulant d'une relation entre un client et un professionnel"), /* @__PURE__ */ React.createElement("li", null, "De l'exactitude des informations fournies par les utilisateurs (particuliers, entrepreneurs, architectes)"), /* @__PURE__ */ React.createElement("li", null, "Des ententes financi\xE8res prises en dehors de la plateforme")), /* @__PURE__ */ React.createElement("p", null, "Tout litige li\xE9 \xE0 l'ex\xE9cution d'un projet doit \xEAtre r\xE9gl\xE9 directement entre le client et le professionnel concern\xE9.")), /* @__PURE__ */ React.createElement(Section, { title: "4. Comptes et exactitude des renseignements" }, /* @__PURE__ */ React.createElement("p", null, "Vous \xEAtes responsable de l'exactitude des renseignements fournis lors de votre inscription, et de la confidentialit\xE9 de votre mot de passe. Toute fausse d\xE9claration (fausse licence, fausse identit\xE9, etc.) peut entra\xEEner la suspension imm\xE9diate de votre compte.")), /* @__PURE__ */ React.createElement(Section, { title: "5. Cr\xE9dits et paiements" }, /* @__PURE__ */ React.createElement("p", null, "Les cr\xE9dits achet\xE9s par les professionnels servent \xE0 miser sur des projets affich\xE9s sur la plateforme. Les cr\xE9dits ne sont pas remboursables une fois utilis\xE9s pour une mise. Les paiements sont trait\xE9s par Stripe; R\xE9no-Confiance ne stocke aucune information de carte de cr\xE9dit.")), /* @__PURE__ */ React.createElement(Section, { title: "6. Protection des coordonn\xE9es" }, /* @__PURE__ */ React.createElement("p", null, "Les coordonn\xE9es compl\xE8tes d'un client ne sont d\xE9voil\xE9es \xE0 un professionnel qu'une fois une mise accept\xE9e par ce client. Il est interdit de contourner ce processus pour solliciter un client directement avant l'acceptation d'une mise.")), /* @__PURE__ */ React.createElement(Section, { title: "7. Qualification et disqualification" }, /* @__PURE__ */ React.createElement("p", null, "R\xE9no-Confiance se r\xE9serve le droit de qualifier, disqualifier ou suspendre tout compte, \xE0 sa seule discr\xE9tion, si les crit\xE8res de la plateforme ne sont pas respect\xE9s.")), /* @__PURE__ */ React.createElement(Section, { title: "8. Modifications" }, /* @__PURE__ */ React.createElement("p", null, "Ces conditions peuvent \xEAtre mises \xE0 jour occasionnellement. La date de la derni\xE8re mise \xE0 jour appara\xEEt en haut de cette page. L'utilisation continue du site apr\xE8s une modification constitue une acceptation des nouvelles conditions.")), /* @__PURE__ */ React.createElement(Section, { title: "9. Droit applicable" }, /* @__PURE__ */ React.createElement("p", null, "Ces conditions sont r\xE9gies par les lois de la province de Qu\xE9bec et les lois f\xE9d\xE9rales du Canada applicables.")), /* @__PURE__ */ React.createElement(Section, { title: "10. Nous joindre" }, /* @__PURE__ */ React.createElement("p", null, "Pour toute question concernant ces conditions :", " ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@renoconfiance.com", style: { color: COLORS.navy }, className: "underline" }, "contact@renoconfiance.com"))))));
}
function PrivacyView() {
  const Section = ({ title, children }) => /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-base font-semibold mb-2" }, title), /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed space-y-2" }, children));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    SectionBand,
    {
      eyebrow: "Document l\xE9gal",
      title: "Politique de confidentialit\xE9",
      subtitle: "Derni\xE8re mise \xE0 jour : juillet 2026"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto" }, /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed mb-8" }, "R\xE9no-Confiance (\xAB nous \xBB, \xAB la plateforme \xBB) s'engage \xE0 prot\xE9ger les renseignements personnels des propri\xE9taires, entrepreneurs, architectes et autres utilisateurs de son site web (renoconfiance.com), conform\xE9ment \xE0 la Loi sur la protection des renseignements personnels dans le secteur priv\xE9 du Qu\xE9bec (Loi 25)."), /* @__PURE__ */ React.createElement(Section, { title: "1. Renseignements que nous collectons" }, /* @__PURE__ */ React.createElement("p", null, "Selon votre utilisation du site, nous pouvons collecter :"), /* @__PURE__ */ React.createElement("ul", { className: "list-disc pl-5 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "Nom, courriel, num\xE9ro de t\xE9l\xE9phone"), /* @__PURE__ */ React.createElement("li", null, "Adresse et r\xE9gion (pour vos projets soumis)"), /* @__PURE__ */ React.createElement("li", null, "Informations d'entreprise et num\xE9ro de licence RBQ/OAQ (professionnels)"), /* @__PURE__ */ React.createElement("li", null, "Description de vos projets de construction ou r\xE9novation"), /* @__PURE__ */ React.createElement("li", null, "Documents et plans t\xE9l\xE9vers\xE9s"), /* @__PURE__ */ React.createElement("li", null, "Renseignements de paiement (trait\xE9s enti\xE8rement par Stripe \u2014 nous ne stockons jamais vos num\xE9ros de carte)"), /* @__PURE__ */ React.createElement("li", null, "Donn\xE9es de navigation g\xE9n\xE9rales (via Google Analytics)"))), /* @__PURE__ */ React.createElement(Section, { title: "2. Pourquoi nous collectons ces renseignements" }, /* @__PURE__ */ React.createElement("ul", { className: "list-disc pl-5 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "Mettre en relation les propri\xE9taires avec des professionnels certifi\xE9s"), /* @__PURE__ */ React.createElement("li", null, "\xC9valuer et qualifier les candidatures des entrepreneurs et architectes"), /* @__PURE__ */ React.createElement("li", null, "Traiter les achats de cr\xE9dits et les paiements"), /* @__PURE__ */ React.createElement("li", null, "Communiquer avec vous au sujet de vos projets ou de votre compte"), /* @__PURE__ */ React.createElement("li", null, "Am\xE9liorer la plateforme et assurer sa s\xE9curit\xE9"))), /* @__PURE__ */ React.createElement(Section, { title: "3. O\xF9 sont stock\xE9es vos donn\xE9es" }, /* @__PURE__ */ React.createElement("p", null, "Vos renseignements sont h\xE9berg\xE9s par Supabase, dans des serveurs situ\xE9s au Canada. Les formulaires de contact transitent par Formspree, et les paiements par Stripe \u2014 ces deux services appliquent leurs propres mesures de s\xE9curit\xE9 et politiques de confidentialit\xE9.")), /* @__PURE__ */ React.createElement(Section, { title: "4. Qui a acc\xE8s \xE0 vos renseignements" }, /* @__PURE__ */ React.createElement("p", null, "Vos coordonn\xE9es compl\xE8tes ne sont jamais partag\xE9es publiquement. Lorsqu'un professionnel mise sur votre projet, il ne voit que la ville, le type de travaux et le budget estim\xE9 \u2014 vos coordonn\xE9es ne sont d\xE9voil\xE9es qu'une fois une mise accept\xE9e par vous. L'acc\xE8s administratif complet est r\xE9serv\xE9 au responsable de la plateforme, qui \xE9value personnellement chaque dossier.")), /* @__PURE__ */ React.createElement(Section, { title: "5. Vos droits" }, /* @__PURE__ */ React.createElement("p", null, "Conform\xE9ment \xE0 la loi, vous pouvez en tout temps :"), /* @__PURE__ */ React.createElement("ul", { className: "list-disc pl-5 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "Demander l'acc\xE8s aux renseignements que nous d\xE9tenons \xE0 votre sujet"), /* @__PURE__ */ React.createElement("li", null, "Demander la correction de renseignements inexacts"), /* @__PURE__ */ React.createElement("li", null, "Demander la suppression de votre compte et de vos donn\xE9es"), /* @__PURE__ */ React.createElement("li", null, "Retirer votre consentement \xE0 certains traitements"), /* @__PURE__ */ React.createElement("li", null, "D\xE9poser une plainte aupr\xE8s de la Commission d'acc\xE8s \xE0 l'information du Qu\xE9bec")), /* @__PURE__ */ React.createElement("p", null, "Pour exercer ces droits, contactez-nous \xE0", " ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@renoconfiance.com", style: { color: COLORS.navy }, className: "underline" }, "contact@renoconfiance.com"), ".")), /* @__PURE__ */ React.createElement(Section, { title: "6. T\xE9moins (cookies) et analytique" }, /* @__PURE__ */ React.createElement("p", null, "Le site utilise Google Analytics pour comprendre comment il est utilis\xE9, de fa\xE7on agr\xE9g\xE9e et anonymis\xE9e. Aucune donn\xE9e de navigation n'est vendue \xE0 des tiers.")), /* @__PURE__ */ React.createElement(Section, { title: "7. S\xE9curit\xE9" }, /* @__PURE__ */ React.createElement("p", null, "Nous appliquons des mesures raisonnables pour prot\xE9ger vos renseignements contre l'acc\xE8s non autoris\xE9, incluant le chiffrement des communications (HTTPS), des r\xE8gles d'acc\xE8s strictes \xE0 la base de donn\xE9es, et une authentification s\xE9curis\xE9e pour tous les comptes.")), /* @__PURE__ */ React.createElement(Section, { title: "8. Modifications" }, /* @__PURE__ */ React.createElement("p", null, "Cette politique peut \xEAtre mise \xE0 jour occasionnellement. La date de la derni\xE8re mise \xE0 jour appara\xEEt en haut de cette page.")), /* @__PURE__ */ React.createElement(Section, { title: "9. Nous joindre" }, /* @__PURE__ */ React.createElement("p", null, "Pour toute question concernant cette politique ou vos renseignements personnels :", " ", /* @__PURE__ */ React.createElement("a", { href: "mailto:contact@renoconfiance.com", style: { color: COLORS.navy }, className: "underline" }, "contact@renoconfiance.com"))))));
}
function FaqView() {
  const faqs = [
    {
      q: "Comment sont v\xE9rifi\xE9s les entrepreneurs et architectes ?",
      a: "Chaque candidature est \xE9valu\xE9e personnellement : licence RBQ ou membership OAQ, preuve d'assurance, ant\xE9c\xE9dents, puis une \xE9valuation avant d'obtenir un sceau de certification."
    },
    {
      q: "Combien co\xFBte soumettre un projet ?",
      a: "Rien pour les particuliers. Ce sont les professionnels qui utilisent des cr\xE9dits pour miser sur les projets qui les int\xE9ressent."
    },
    {
      q: "Dans quelles r\xE9gions \xEAtes-vous actifs ?",
      a: "R\xE9no-Confiance est actif partout au Qu\xE9bec."
    },
    {
      q: "Mes coordonn\xE9es sont-elles partag\xE9es avec les entrepreneurs ?",
      a: "Non. Les professionnels voient seulement la ville, le type de travaux et le budget estim\xE9. Vos coordonn\xE9es ne sont d\xE9voil\xE9es qu'une fois une mise accept\xE9e."
    },
    {
      q: "Comment devenir partenaire certifi\xE9 ?",
      a: "Remplis le formulaire dans la section \xAB Entrepreneurs \xBB avec tes informations et ton num\xE9ro RBQ ou OAQ. Ton dossier sera ensuite \xE9valu\xE9 personnellement."
    }
  ];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SectionBand, { eyebrow: "Questions fr\xE9quentes", title: "FAQ", subtitle: "Les r\xE9ponses aux questions les plus courantes." }), /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-14", style: { background: COLORS.paper } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto space-y-4" }, faqs.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.q, style: { background: COLORS.card, borderColor: COLORS.paperDark }, className: "border rounded-lg p-5" }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Poppins', sans-serif", color: COLORS.navy }, className: "text-sm font-semibold mb-1.5" }, f.q), /* @__PURE__ */ React.createElement("p", { style: { color: COLORS.steel }, className: "text-sm leading-relaxed" }, f.a))))));
}
function InsurersView() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const joinWaitlist = async () => {
    if (!email) return;
    setError("");
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ formulaire: "Liste d'attente assureurs", courriel: email })
      });
      if (!res.ok) throw new Error("Envoi refus\xE9");
      setJoined(true);
    } catch (e) {
      setError("L'envoi a \xE9chou\xE9, r\xE9essaie dans un instant.");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "px-6 md:px-14 py-16", style: { background: COLORS.navy, minHeight: 420 } }, /* @__PURE__ */ React.createElement("div", { className: "max-w-xl mx-auto text-center" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: "#ffffff15" },
      className: "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
    },
    /* @__PURE__ */ React.createElement(Lock, { size: 22, color: "#fff" })
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { fontFamily: "'IBM Plex Mono', monospace", color: COLORS.orange },
      className: "text-xs tracking-widest uppercase mb-3"
    },
    "Volet \xE0 venir"
  ), /* @__PURE__ */ React.createElement(
    "h2",
    {
      style: { fontFamily: "'Poppins', sans-serif", color: "#fff" },
      className: "text-3xl font-semibold mb-3"
    },
    "Espace assureurs"
  ), /* @__PURE__ */ React.createElement("p", { className: "text-white/65 text-sm leading-relaxed mb-8" }, "Un acc\xE8s d\xE9di\xE9 permettra bient\xF4t aux assureurs de rechercher des entrepreneurs certifi\xE9s par r\xE9gion et sp\xE9cialit\xE9, de consulter leur historique de projets et de les int\xE9grer directement \xE0 leurs dossiers de r\xE9clamation."), joined ? /* @__PURE__ */ React.createElement("div", { className: "text-white/85 text-sm flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(CheckCircle2, { size: 16, style: { color: COLORS.orange } }), "Merci, nous vous pr\xE9viendrons au lancement.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex-1" }, /* @__PURE__ */ React.createElement(Mail, { size: 14, className: "absolute left-3 top-1/2 -translate-y-1/2 text-white/50" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "courriel professionnel",
      className: "w-full bg-white/10 text-white placeholder-white/40 rounded-sm pl-8 pr-3 py-2.5 text-sm outline-none border border-white/15 focus:border-white/40"
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: joinWaitlist,
      disabled: sending,
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif", opacity: sending ? 0.7 : 1 },
      className: "px-5 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide whitespace-nowrap"
    },
    sending ? "Envoi\u2026" : "M'aviser"
  )), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#F0AD25" }, className: "text-xs mt-3" }, error))));
}
function App() {
  const [tab, setTab] = useState("home");
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { id: "home", label: "Accueil" },
    { id: "certification", label: "Comment \xE7a fonctionne" },
    { id: "submit", label: "Propri\xE9taires" },
    { id: "join", label: "Entrepreneurs" },
    { id: "trust", label: "\xC0 propos" },
    { id: "faq", label: "FAQ" }
  ];
  const goToAndClose = (id) => {
    setTab(id);
    setLoginMenuOpen(false);
    setMobileMenuOpen(false);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'IBM Plex Sans', sans-serif" }, className: "w-full min-h-full" }, /* @__PURE__ */ React.createElement("style", null, FONT_IMPORT), /* @__PURE__ */ React.createElement("header", { className: "px-6 md:px-14 py-4 flex items-center justify-between gap-4 border-b relative", style: { borderColor: COLORS.paperDark } }, /* @__PURE__ */ React.createElement("div", { onClick: () => goToAndClose("home"), className: "cursor-pointer" }, /* @__PURE__ */ React.createElement(Logo, null)), /* @__PURE__ */ React.createElement("nav", { className: "hidden md:flex flex-wrap" }, navLinks.map((t) => /* @__PURE__ */ React.createElement(NavTab, { key: t.id, label: t.label, active: tab === t.id, onClick: () => goToAndClose(t.id) }))), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex items-center gap-3 relative" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setLoginMenuOpen((o) => !o),
      style: { borderColor: COLORS.paperDark, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
      className: "px-4 py-2 rounded-md text-sm font-medium border"
    },
    "Se connecter"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => goToAndClose("join"),
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
      className: "px-4 py-2 rounded-md text-sm font-semibold"
    },
    "S'inscrire"
  ), loginMenuOpen && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { borderColor: COLORS.paperDark, top: "110%" },
      className: "absolute right-0 bg-white border rounded-lg shadow-lg py-2 w-56 z-10"
    },
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goToAndClose("clientdash"),
        style: { color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
      },
      /* @__PURE__ */ React.createElement(UserCircle, { size: 14 }),
      " Je suis client"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goToAndClose("espacepro"),
        style: { color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
      },
      /* @__PURE__ */ React.createElement(HardHat, { size: 14 }),
      " Je suis un professionnel"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goToAndClose("admin"),
        style: { color: COLORS.steel, fontFamily: "'Poppins', sans-serif" },
        className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
      },
      /* @__PURE__ */ React.createElement(Lock, { size: 14 }),
      " Administration"
    )
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMobileMenuOpen((o) => !o),
      className: "md:hidden p-2 -mr-2",
      style: { color: COLORS.navy }
    },
    mobileMenuOpen ? /* @__PURE__ */ React.createElement(X, { size: 22 }) : /* @__PURE__ */ React.createElement(Menu, { size: 22 })
  ), mobileMenuOpen && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: "#fff", borderColor: COLORS.paperDark, top: "100%" },
      className: "md:hidden absolute left-0 right-0 border-t shadow-lg z-20 px-6 py-4"
    },
    /* @__PURE__ */ React.createElement("nav", { className: "flex flex-col gap-1 mb-4" }, navLinks.map((t) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: t.id,
        onClick: () => goToAndClose(t.id),
        style: {
          fontFamily: "'Poppins', sans-serif",
          color: tab === t.id ? COLORS.navy : COLORS.steel,
          background: tab === t.id ? "#F7F8FA" : "transparent"
        },
        className: "text-left px-3 py-2.5 rounded-md text-sm font-medium"
      },
      t.label
    ))),
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2 mb-4 pt-3 border-t", style: { borderColor: COLORS.paperDark } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goToAndClose("clientdash"),
        style: { color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
        className: "text-left px-3 py-2 text-sm flex items-center gap-2"
      },
      /* @__PURE__ */ React.createElement(UserCircle, { size: 14 }),
      " Je suis client"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goToAndClose("espacepro"),
        style: { color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
        className: "text-left px-3 py-2 text-sm flex items-center gap-2"
      },
      /* @__PURE__ */ React.createElement(HardHat, { size: 14 }),
      " Je suis un professionnel"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goToAndClose("admin"),
        style: { color: COLORS.steel, fontFamily: "'Poppins', sans-serif" },
        className: "text-left px-3 py-2 text-sm flex items-center gap-2"
      },
      /* @__PURE__ */ React.createElement(Lock, { size: 14 }),
      " Administration"
    )),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => goToAndClose("join"),
        style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
        className: "w-full px-4 py-2.5 rounded-md text-sm font-semibold"
      },
      "S'inscrire"
    )
  )), tab === "home" && /* @__PURE__ */ React.createElement(HomeView, { goTo: setTab }), tab === "submit" && /* @__PURE__ */ React.createElement(SubmitView, null), tab === "contractors" && /* @__PURE__ */ React.createElement(ContractorsView, null), tab === "architects" && /* @__PURE__ */ React.createElement(ArchitectsView, null), tab === "trust" && /* @__PURE__ */ React.createElement(TrustNetworkView, null), tab === "showcase" && /* @__PURE__ */ React.createElement(ShowcaseView, null), tab === "certification" && /* @__PURE__ */ React.createElement(CertificationView, null), tab === "join" && /* @__PURE__ */ React.createElement(JoinView, { goTo: setTab }), tab === "espacepro" && /* @__PURE__ */ React.createElement(EspaceProView, null), tab === "insurers" && /* @__PURE__ */ React.createElement(InsurersView, null), tab === "clientdash" && /* @__PURE__ */ React.createElement(ClientDashboardView, null), tab === "admin" && /* @__PURE__ */ React.createElement(AdminDashboardView, null), tab === "faq" && /* @__PURE__ */ React.createElement(FaqView, null), tab === "materials" && /* @__PURE__ */ React.createElement(MaterialsView, null), tab === "privacy" && /* @__PURE__ */ React.createElement(PrivacyView, null), tab === "terms" && /* @__PURE__ */ React.createElement(TermsView, null), tab === "booking" && /* @__PURE__ */ React.createElement(BookingView, null), /* @__PURE__ */ React.createElement("section", { style: { background: COLORS.navy }, className: "px-6 md:px-14 py-10 flex flex-wrap items-center justify-between gap-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Poppins', sans-serif", color: "#fff" }, className: "text-lg font-semibold" }, "Une question ? Parlons-en directement."), /* @__PURE__ */ React.createElement("p", { className: "text-white/60 text-sm mt-1" }, "R\xE9serve un appel rapide avec nous, sans engagement.")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => goToAndClose("booking"),
      style: { background: COLORS.orange, color: COLORS.navy, fontFamily: "'Poppins', sans-serif" },
      className: "px-6 py-3 rounded-md text-sm font-semibold whitespace-nowrap"
    },
    "R\xE9server un appel"
  )), /* @__PURE__ */ React.createElement("footer", { style: { background: COLORS.navy, borderTop: "1px solid #ffffff15" }, className: "px-6 md:px-14 py-10" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto flex flex-wrap justify-between gap-8" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Logo, { light: true, size: 30 }), /* @__PURE__ */ React.createElement("p", { className: "text-white/50 text-xs mt-3 max-w-xs" }, "La plateforme de confiance pour vos projets de r\xE9novation et construction, partout au Qu\xE9bec.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-x-10 gap-y-3 text-xs", style: { fontFamily: "'Poppins', sans-serif" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("contractors"), className: "text-white/70 hover:text-white" }, "R\xE9pertoire des entrepreneurs"), /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("architects"), className: "text-white/70 hover:text-white" }, "R\xE9pertoire des architectes"), /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("showcase"), className: "text-white/70 hover:text-white" }, "R\xE9alisations"), /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("insurers"), className: "text-white/70 hover:text-white" }, "Assureurs"), /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("booking"), className: "text-white/70 hover:text-white" }, "R\xE9server un appel"), /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("materials"), className: "text-white/70 hover:text-white" }, "Estimation de mat\xE9riaux"))), /* @__PURE__ */ React.createElement("div", { style: { color: "#ffffff40", fontFamily: "'IBM Plex Mono', monospace" }, className: "text-xs text-center mt-8 flex items-center justify-center gap-3" }, /* @__PURE__ */ React.createElement("span", null, "R\xE9no-Confiance \u2014 Qu\xE9bec"), /* @__PURE__ */ React.createElement("span", null, "\xB7"), /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("privacy"), className: "underline hover:text-white/70" }, "Politique de confidentialit\xE9"), /* @__PURE__ */ React.createElement("span", null, "\xB7"), /* @__PURE__ */ React.createElement("button", { onClick: () => goToAndClose("terms"), className: "underline hover:text-white/70" }, "Conditions d'utilisation"))));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
