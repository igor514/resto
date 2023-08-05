import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {Words} from "../../model/orm/words.type";
import {Lang} from "../../model/orm/lang.model";
import {AppService} from "../../services/app.service";
import {WordRepository} from "../../services/repositories/word.repository";
import QRCodeStyling, {CornerSquareType, DotType, Options} from "styled-qr-code";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {CornerDotType} from "styled-qr-code/lib/types";
import {AuthService} from "../../services/auth.service";
import {QRRepository} from "../../services/repositories/qr.repository";
import {IQRCreate} from "../../model/dto/qr.create.dto";
import {Icon, IconType} from "../../model/orm/icon.model";
import {IconRepository} from "../../services/repositories/icon.repository";
import {SettingRepository} from "../../services/repositories/setting.repository";
import {STATIC_TOKEN} from "../../tokens";



@Component({
  selector: 'qr-customize',
  templateUrl: './qr-customize.component.html',
  styleUrls: ['../../common.styles/popup.scss', '../../common.styles/data.scss', 'qr-customize.component.scss']
})
export class QRCustomizeComponent implements AfterViewInit, OnDestroy {
  @Input() active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>()
  @Output() update = new EventEmitter<void>();
  @ViewChild('container') container: ElementRef<HTMLDivElement>
  @ViewChild('imageUpload') imageUpload: ElementRef<HTMLInputElement>
  options: Options = {
    type: 'svg',
    width: 200,
    height: 200,
    margin: 10,
    data: '/table/table_code',
    dotsOptions: {
      color: "#000000",
      type: "extra-rounded"
    },
    cornersDotOptions: {
      color: "#000000",
      type: 'square'
    },
    cornersSquareOptions: {
      color: "#000000",
      type: 'square'
    },
    // short #fff form does not
    // display correctly for default value
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 2,
      imageSize: 0.3,
      hideBackgroundDots: true
    },
    qrOptions: {
      typeNumber: 0,
      errorCorrectionLevel: 'M',
      mode: 'Byte'
    }
  };
  updates$ = new EventEmitter<void>();
  updatesSub: Subscription;
  qr: QRCodeStyling;
  icons: Icon[] = [];
  icon_id: number;


  submitLoading = false;
  initLoading = true;

  file: File;
  fileUrl: string;

  dotType: DotType[] = ["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"]
  cornerDotType: CornerDotType[] = ["dot", "square"]
  cornerType: CornerSquareType[] = ["dot", "square", "extra-rounded"]

  constructor(
    @Inject(STATIC_TOKEN) private staticPath: string,
    private appService: AppService,
    private authService: AuthService,
    private wordRepository: WordRepository,
    private qrRepository: QRRepository,
    private iconRepository: IconRepository,
    private settingRepository: SettingRepository
  ) {}

  get customerUrl(): string {return this.settingRepository.settings["customer-app-url"];}
  get data(): string {return `${this.customerUrl}/table/table_code`;}
  get words(): Words {return this.wordRepository.words;}
  get currentLang(): Lang {return this.appService.currentLang.value;}

  onUpdate() {
    this.updates$.emit()
  }
  async ngAfterViewInit() {
    this.options.data = this.data
    const DEBOUNCE_UPDATE = 100
    this.updatesSub = this.updates$
      .pipe(debounceTime(DEBOUNCE_UPDATE))
      .subscribe(() => this.drawQR())
    this.qr = new QRCodeStyling(this.options)
    this.qr.append(this.container.nativeElement)
    try {
      this.icons = await this.iconRepository.loadAll("pos", 1,{type: IconType.QR});
      await this.getConfig()
    } finally {
      this.initLoading = false
      this.drawQR();
    }
  }

  drawQR() {
    const options = Object.assign({}, this.options)
    this.qr.update(options)
  }
  ngOnDestroy() {
    this.updatesSub.unsubscribe()
  }

  onUploadClick(): void {
    this.imageUpload.nativeElement.click();
  }

  onImageDelete() {
    this.file = null;
    this.fileUrl = null
    this.options.image = null
    this.onUpdate()
  }

  onImageUpload(file = this.imageUpload.nativeElement.files[0]) {
    this.file = file;
    this.fileUrl = URL.createObjectURL(this.file)
    this.options.image = this.fileUrl
    this.icon_id = null;
    this.onUpdate()
  }

  async onIconSelect(icon_id: number) {
    await this.setIcon(icon_id)
    this.drawQR()
  }

  private async setIcon(icon_id: number) {
    this.file = null
    this.fileUrl = null
    this.icon_id = icon_id
    if (icon_id === null) {
      this.options.image = null
    } else {
      const icon = this.icons.find(i => i.id === icon_id)
      if (!icon) {
        this.icon_id = null;
      } else {
        const rest = this.authService.authData.value.employee.restaurant
        const blob = await this.qrRepository.getIcon(icon_id)
        const file = new File([blob], icon.img)
        const fileUrl = URL.createObjectURL(file)
        this.options.image = fileUrl
      }
    }
  }

  async saveConfig(): Promise<void> {
    const op = this.options
    const payload: IQRCreate = {
      size: op.width,
      margin: op.margin,
      dotColor: op.dotsOptions.color,
      dotType: op.dotsOptions.type,
      cornerDotColor: op.cornersDotOptions.color,
      cornerDotType: op.cornersDotOptions.type,
      cornerSquareColor: op.cornersSquareOptions.color,
      cornerSquareType: op.cornersSquareOptions.type,
      imageMargin: op.imageOptions.margin,
      imageSize: op.imageOptions.imageSize,
      background: op.backgroundOptions.color,
    }

    if (this.icon_id) {
      payload.icon_id = this.icon_id
    }

    const form = new FormData()
    for (let value of Object.getOwnPropertyNames(payload)) {
      form.append(value, payload[value])
    }
    if (this.file) {
      form.append('file', this.file, this.file.name)
    }
    this.submitLoading = true;
    const rest = this.authService.authData.value.employee.restaurant
    try {
      await this.qrRepository.update(rest.id, form)
      this.update.emit();
    } finally {
      this.submitLoading = false
    }
  }

  async getConfig(): Promise<void> {
    const rest = this.authService.authData.value.employee.restaurant
    const op = await this.qrRepository.get(rest.id)

    if (!op) return

    if (op.imgURL) {
      const icon: Blob = await this.qrRepository.getMedia(rest.id)
      this.file = new File([icon], op.imgName)
      this.fileUrl = URL.createObjectURL(icon)
      this.options.image = this.fileUrl
    } else if (op.icon_id) {
      await this.setIcon(op.icon_id)
    }

    this.options.margin = op.margin
    this.options.width = op.size
    this.options.height = op.size
    this.options.dotsOptions.type = op.dotType
    this.options.dotsOptions.color = op.dotColor
    this.options.cornersSquareOptions.type = op.cornerSquareType
    this.options.cornersSquareOptions.color = op.cornerSquareColor
    this.options.cornersDotOptions.type = op.cornerDotType
    this.options.cornersDotOptions.color = op.cornerDotColor
    this.options.imageOptions.margin = op.imageMargin
    this.options.imageOptions.imageSize = op.imageSize
    this.options.backgroundOptions.color = op.background
    this.icon_id = op.icon_id
  }

  close() {
    this.activeChange.emit(false)
  }
}
